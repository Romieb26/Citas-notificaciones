//Citas.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CitasService } from '../../Services/Citas.Services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './Citas.component.html',
  styleUrls: ['./Citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  nuevaCita = { nombrePaciente: '', apellidoPaciente: '', numeroContacto: '', areaCita: '', fecha: '', hora: '' };

  private citasService = inject(CitasService);

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.citasService.getCitas().subscribe(data => this.citas = data);
  }

  agregarCita() {
    this.citasService.crearCita(this.nuevaCita).subscribe(() => {
      this.obtenerCitas();
      this.nuevaCita = { nombrePaciente: '', apellidoPaciente: '', numeroContacto: '', areaCita: '', fecha: '', hora: '' };
    });
  }
}