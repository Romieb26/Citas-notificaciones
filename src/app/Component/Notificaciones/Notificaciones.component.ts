import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesComponent {
  private notificacionesSubject = new BehaviorSubject<string[]>([]);
  notificaciones$ = this.notificacionesSubject.asObservable();

  constructor() {}

  agregarNotificacion(mensaje: string): void {
    const notificacionesActuales = this.notificacionesSubject.value;
    this.notificacionesSubject.next([...notificacionesActuales, mensaje]);
  }

  limpiarNotificaciones(): void {
    this.notificacionesSubject.next([]);
  }
}