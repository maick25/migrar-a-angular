import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pqr.html',
  styleUrl: './pqr.css'
})
export class Pqr {
  nombre = '';
  correo = '';
  tipo = '';
  mensaje = '';
  respuesta = '';

  enviarFormulario(event: Event) {
    event.preventDefault();
    this.respuesta = `Gracias ${this.nombre}, tu ${this.tipo} fue enviada satisfactoriamente.`;
    this.nombre = '';
    this.correo = '';
    this.tipo = '';
    this.mensaje = '';
  }
}