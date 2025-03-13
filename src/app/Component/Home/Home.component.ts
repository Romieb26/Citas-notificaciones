//Home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule para el navbar

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agrega RouterModule aquí
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {

  mostrarNotificacion() {
    alert('¡Notificación mostrada!');
    console.log('El usuario hizo clic en el botón.');
  }
}