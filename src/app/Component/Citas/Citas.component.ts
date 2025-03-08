import { Component, OnInit, inject } from '@angular/core';
import { CitasService } from '../../Services/Citas.Services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './Citas.component.html',
  styleUrls: ['./Citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  nuevaCita = { paciente: '', medico: '', fecha: '', estado: 'pendiente' };

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
      this.nuevaCita = { paciente: '', medico: '', fecha: '', estado: 'pendiente' };
    });
  }
}
