import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {
  tamañoBase = 15;

  aumentarTexto() {
    if (this.tamañoBase < 19) {
      this.tamañoBase += 1;
      document.documentElement.style.fontSize = this.tamañoBase + 'px';
    }
  }

  disminuirTexto() {
    if (this.tamañoBase > 12) {
      this.tamañoBase -= 1;
      document.documentElement.style.fontSize = this.tamañoBase + 'px';
    }
  }

  contraste() {
    document.body.classList.toggle('alto-contraste');
  }
}