import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-emocional',
  imports: [CommonModule],
  templateUrl: './test-emocional.html',
  styleUrl: './test-emocional.css'
})
export class TestEmocionalComponent {
  consejo: string = '';

  consejosBien = [
    '✨ Qué bueno verte así, sigue cuidando tu cuerpo y tu mente',
    '💧 Mantente hidratado y activo',
    '🌞 Aprovecha tu buen ánimo para ayudar a alguien',
    '📚 Continúa aprendiendo cosas nuevas',
    '🏃 Disfruta tu energía y cuida tu cuerpo'
  ];

  consejosRegular = [
    '🌿 Respira profundo por un minuto',
    '🎧 Escucha música que te relaje',
    '🚶 Da una caminata corta',
    '📝 Escribe lo que sientes',
    '☕ Tómate una pausa y descansa'
  ];

  consejosMal = [
    '💙 No estás solo, todo pasa',
    '🫶 Habla con alguien de confianza',
    '🌧️ Está bien sentirte así, respira',
    '📵 Aléjate un rato del celular',
    '🌱 Mañana será un nuevo comienzo'
  ];

  mostrarConsejo(estado: string) {
    let lista: string[] = [];
    if (estado === 'bien') lista = this.consejosBien;
    else if (estado === 'regular') lista = this.consejosRegular;
    else lista = this.consejosMal;

    const numero = Math.floor(Math.random() * lista.length);
    this.consejo = lista[numero];
  }
}
