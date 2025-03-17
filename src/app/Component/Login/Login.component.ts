//Login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  // Usuario y contraseña precargados
  private usuarioValido = 'romi';
  private contrasenaValida = '1234';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === this.usuarioValido && this.contrasena === this.contrasenaValida) {
      this.router.navigate(['/admin']); // Redirige a la vista de Admin
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';
    }
  }
}