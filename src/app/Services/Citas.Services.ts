import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl = 'http://localhost:8000/citas/';

  private http = inject(HttpClient);

  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }
}