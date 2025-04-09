//Notificacion.Services.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz Cita
export interface Cita {
  citaId?: number; // Cambia 'id' por 'cita_id' si es necesario
  nombrePaciente: string;
  apellidoPaciente: string;
  numeroContacto: string;
  areaCita: string;
  fecha: string;
  hora: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'http://34.237.191.108:8001/notificacion/';
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

  // Actualizar el estado de una notificación (cita)
  actualizarEstadoCita(id: number, estado: string): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}${id}`, { estado });
  }

  // Eliminar una notificación (cita) por ID
  eliminarNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}