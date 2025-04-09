//Citas.Services.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl = 'http://44.210.194.96:8000/citas/'; // URL base de tu API

  private http = inject(HttpClient);

  // Obtener todas las citas
  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una cita por ID
  getCitaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  // Crear una nueva cita
  crearCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }

  // Actualizar una cita existente
  actualizarCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, cita);
  }

  // Eliminar una cita por ID
  eliminarCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}