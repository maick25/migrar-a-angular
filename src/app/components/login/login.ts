import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  correo = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private auth: Auth, private router: Router) {}

  iniciarSesion() {
    this.error = '';
    if (!this.correo || !this.password) { this.error = 'Completa todos los campos.'; return; }
    this.cargando = true;
    this.auth.login(this.correo, this.password).subscribe({
      next: (usuario) => {
        this.cargando = false;
        usuario ? this.router.navigate(['/dashboard']) : (this.error = 'Correo o contraseña incorrectos.');
      },
      error: () => { this.cargando = false; this.error = 'Error al conectar. ¿Está corriendo el backend?'; }
    });
  }
}
