//Admin.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { NotificacionService, Cita } from '../../Services/Notificacion.Services'; // Importa Cita
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Agregar FormsModule aquí
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css'],
})
export class AdminComponent implements OnInit {
  citas: Cita[] = []; // Todas las citas
  citasFiltradas: Cita[] = []; // Citas filtradas
  estados: string[] = ['pendiente', 'aceptado', 'rechazada', 'en espera']; // Lista de estados
  estadoFiltro: string = 'pendiente'; // Estado seleccionado para filtrar (inicialmente "pendiente")

  private notificacionService = inject(NotificacionService);

  ngOnInit() {
    this.obtenerCitas();
  }

  // Obtener todas las citas y filtrar por "pendiente" al inicio
  obtenerCitas() {
    this.notificacionService.getNotificaciones().subscribe({
      next: (data) => {
        this.citas = data;
        this.citasFiltradas = data.filter((cita) => cita.estado === 'pendiente'); // Filtrar por "pendiente" al inicio
        console.log('Citas obtenidas:', this.citas); // Depuración: Verifica que las citas tengan cita_id
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      },
    });
  }

  // Confirmar antes de cambiar el estado
  confirmarCambioEstado(cita: Cita, nuevoEstado: string) {
    const confirmacion = window.confirm(
      `¿Estás seguro de cambiar el estado de la cita a "${nuevoEstado}"?`
    );

    if (confirmacion) {
      this.actualizarEstado(cita, nuevoEstado);
    } else {
      // Si el usuario cancela, restablecer el estado anterior
      cita.estado = cita.estado; // No es necesario hacer nada, pero puedes agregar lógica adicional si lo deseas
    }
  }

  // Actualizar el estado de una cita
  actualizarEstado(cita: Cita, nuevoEstado: string) {
    if (!cita.citaId) { // Cambia 'id' por 'cita_id'
      console.error('Error: La cita no tiene un ID válido');
      return;
    }

    this.notificacionService.actualizarEstadoCita(cita.citaId, nuevoEstado).subscribe({
      next: (citaActualizada) => {
        // Actualizar el estado en la lista local
        cita.estado = nuevoEstado;
        this.filtrarCitas(this.estadoFiltro); // Re-filtrar después de actualizar
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      },
    });
  }

  // Filtrar citas por estado
  filtrarCitas(estado: string) {
    this.estadoFiltro = estado;
    if (estado === 'todos') {
      this.citasFiltradas = this.citas; // Mostrar todas las citas
    } else {
      this.citasFiltradas = this.citas.filter((cita) => cita.estado === estado); // Filtrar por estado
    }
  }
}