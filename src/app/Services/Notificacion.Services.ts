import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  numeroContacto: string;
  areaCita: string;
  fecha: string;
  hora: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'http://localhost:8001/notificacion/'; 
  private http = inject(HttpClient);

  // Obtener todas las notificaciones (citas)
  getNotificaciones(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  // Obtener una notificación (cita) por ID
  getNotificacionById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}${id}`);
  }

  // Crear una nueva notificación (cita)
  crearNotificacion(notificacion: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, notificacion);
  }

  // Actualizar una notificación (cita) existente
  actualizarNotificacion(id: number, notificacion: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}${id}`, notificacion);
  }

  // Eliminar una notificación (cita) por ID
  eliminarNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}