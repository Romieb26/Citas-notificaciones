import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = 'http://localhost:3000/notificaciones'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las notificaciones
  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva notificación
  createNotificacion(notificacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, notificacion);
  }

  // Eliminar una notificación por ID
  deleteNotificacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
