import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NotificacionService, Cita, NotificacionCita } from '../../Services/Notificacion.Services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  notificaciones: NotificacionCita[] = [];
  estados: string[] = ['pendiente', 'aceptado', 'rechazada', 'en espera'];
  estadoFiltro: string = 'pendiente';
  
  private subscriptions: Subscription[] = [];
  private notificacionService = inject(NotificacionService);

  ngOnInit() {
    // Cargar citas iniciales
    this.subscriptions.push(
      this.notificacionService.getNotificaciones().subscribe({
        next: (data) => {
          this.citas = data;
          this.filtrarCitas(this.estadoFiltro);
        },
        error: (err) => {
          console.error('Error al obtener citas iniciales:', err);
        }
      })
    );

    // Suscribirse a actualizaciones en tiempo real
    this.subscriptions.push(
      this.notificacionService.citasEnTiempoReal.subscribe({
        next: (data: Cita | Cita[]) => {
          console.log('Datos recibidos en componente:', data);
          
          if (Array.isArray(data)) {
            this.citas = data;
          } else {
            this.actualizarListaCitas(data);
          }
          this.filtrarCitas(this.estadoFiltro);
        },
        error: (err) => {
          console.error('Error en la suscripción WebSocket:', err);
        }
      })
    );

    // Suscribirse a notificaciones
    this.subscriptions.push(
      this.notificacionService.notificaciones$.subscribe(notifs => {
        this.notificaciones = notifs.filter(n => !n.vista);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private actualizarListaCitas(cita: Cita) {
    if (cita.citaId === undefined || cita.citaId === null) {
      console.error('Cita recibida sin ID válido:', cita);
      return;
    }

    const index = this.citas.findIndex(c => c.citaId === cita.citaId);
    
    if (index !== -1) {
      this.citas[index] = cita;
    } else {
      this.citas.unshift(cita);
    }
  }

  confirmarCambioEstado(cita: Cita, nuevoEstado: string) {
    const confirmacion = window.confirm(
      `¿Estás seguro de cambiar el estado de la cita a "${nuevoEstado}"?`
    );

    if (confirmacion) {
      this.actualizarEstado(cita, nuevoEstado);
    } else {
      const originalCita = this.citas.find(c => c.citaId === cita.citaId);
      if (originalCita) {
        cita.estado = originalCita.estado;
      }
    }
  }

  actualizarEstado(cita: Cita, nuevoEstado: string) {
    if (!cita.citaId) {
      console.error('Error: La cita no tiene un ID válido');
      return;
    }

    this.notificacionService.actualizarEstadoCita(cita.citaId, nuevoEstado).subscribe({
      next: () => {
        console.log('Estado actualizado, esperando confirmación por WS');
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
        const originalCita = this.citas.find(c => c.citaId === cita.citaId);
        if (originalCita) {
          cita.estado = originalCita.estado;
        }
      },
    });
  }

  filtrarCitas(estado: string) {
    this.estadoFiltro = estado;
    if (estado === 'todos') {
      this.citasFiltradas = [...this.citas];
    } else {
      this.citasFiltradas = this.citas.filter((cita) => cita.estado === estado);
    }
  }

  marcarComoVista(citaId: number) {
    this.notificacionService.marcarComoVista(citaId);
  }
}