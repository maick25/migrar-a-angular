import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pqr.html',
  styleUrl: './pqr.css'
})
export class Pqr {
  nombre = '';
  correo = '';
  tipo = '';
  mensaje = '';
  respuesta = '';
  enviando = false;
  exito = false;

  constructor(private http: HttpClient) {}

  enviarFormulario(event: Event) {
    event.preventDefault();

    if (!this.nombre || !this.correo || !this.tipo || !this.mensaje) {
      this.respuesta = 'Por favor completa todos los campos.';
      return;
    }

    this.enviando = true;
    const pqr = {
      nombre: this.nombre,
      correo: this.correo,
      tipo: this.tipo,
      mensaje: this.mensaje,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'pendiente'
    };

    this.http.post('http://127.0.0.1:3000/pqrs', pqr).subscribe({
      next: () => {
        this.enviando = false;
        this.exito = true;
        this.respuesta = `¡Gracias ${this.nombre}! Tu ${this.tipo} fue enviada satisfactoriamente. Te responderemos al correo ${this.correo}.`;
        this.nombre = '';
        this.correo = '';
        this.tipo = '';
        this.mensaje = '';
      },
      error: () => {
        this.enviando = false;
        this.respuesta = 'Error al enviar. Verifica que el servidor esté activo.';
        this.exito = false;
      }
    });
  }

  nuevaConsulta() {
    this.respuesta = '';
    this.exito = false;
  }
}
