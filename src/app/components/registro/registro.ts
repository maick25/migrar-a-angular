import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre = '';
  correo = '';
  password = '';
  confirmar = '';
  error = '';
  cargando = false;

  constructor(private auth: Auth, private router: Router) {}

  registrarse() {
    this.error = '';
    if (!this.nombre || !this.correo || !this.password || !this.confirmar) {
      this.error = 'Todos los campos son obligatorios.'; return;
    }
    if (this.password !== this.confirmar) {
      this.error = 'Las contraseñas no coinciden.'; return;
    }
    if (this.password.length < 4) {
      this.error = 'La contraseña debe tener al menos 4 caracteres.'; return;
    }
    this.cargando = true;
    this.auth.registro({ nombre: this.nombre, correo: this.correo, password: this.password, rol: 'usuario' })
      .subscribe({
        next: () => { this.cargando = false; this.router.navigate(['/dashboard']); },
        error: () => { this.cargando = false; this.error = 'Error al registrarse. Intenta de nuevo.'; }
      });
  }
}
