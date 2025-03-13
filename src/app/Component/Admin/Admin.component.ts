//Admin.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CitasService } from '../../Services/Citas.Services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {
  citas: any[] = [];

  private citasService = inject(CitasService);

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.citasService.getCitas().subscribe(data => this.citas = data);
  }
}