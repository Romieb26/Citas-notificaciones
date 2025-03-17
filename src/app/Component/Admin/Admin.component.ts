//Admin.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { NotificacionService } from '../../Services/Notificacion.Services'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css'],
})
export class AdminComponent implements OnInit {
  citas: any[] = [];

  private notificacionService = inject(NotificacionService);

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.notificacionService.getNotificaciones().subscribe((data) => {
      this.citas = data;
    });
  }
}