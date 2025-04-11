import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Cita {
  citaId?: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  numeroContacto: string;
  areaCita: string;
  fecha: string;
  hora: string;
  estado: string;
}

export interface NotificacionCita extends Cita {
  vista?: boolean;
  fechaNotificacion?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'http://localhost:8001/notificacion/';
  private wsUrl = 'ws://localhost:8001/ws';
  private socket!: WebSocket;
  private citaSubject = new Subject<Cita | Cita[]>();
  private notificacionesSubject = new Subject<NotificacionCita[]>();
  private notificaciones: NotificacionCita[] = [];
  private http = inject(HttpClient);

  constructor() {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
      this.socket.send(JSON.stringify({ action: 'getAll' }));
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Datos recibidos:', data);
        
        if (Array.isArray(data)) {
          this.citaSubject.next(data);
        } else {
          this.citaSubject.next(data);
          this.agregarNotificacion(data); // Agregar como notificación
        }
      } catch (error) {
        console.error('Error al parsear mensaje WebSocket:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada. Reconectando...');
      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };
  }

  agregarNotificacion(cita: Cita): void {
    const notificacion: NotificacionCita = {
      ...cita,
      vista: false,
      fechaNotificacion: new Date()
    };
    this.notificaciones.unshift(notificacion);
    this.notificacionesSubject.next([...this.notificaciones]);
  }

  marcarComoVista(citaId: number): void {
    const index = this.notificaciones.findIndex(n => n.citaId === citaId);
    if (index !== -1) {
      this.notificaciones[index].vista = true;
      this.notificacionesSubject.next([...this.notificaciones]);
    }
  }

  get citasEnTiempoReal(): Observable<Cita | Cita[]> {
    return this.citaSubject.asObservable();
  }

  get notificaciones$(): Observable<NotificacionCita[]> {
    return this.notificacionesSubject.asObservable();
  }

  getNotificaciones(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  getNotificacionById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}${id}`);
  }

  crearNotificacion(notificacion: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, notificacion);
  }

  actualizarEstadoCita(id: number, estado: string): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}${id}`, { estado });
  }

  eliminarNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  closeWebSocket(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}