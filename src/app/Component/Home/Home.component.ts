import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule si necesitas directivas como *ngIf o *ngFor

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {

  mostrarNotificacion() {
    alert('¡Notificación mostrada!'); 
    console.log('El usuario hizo clic en el botón.');
  }
}