import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  usuarioActual: any = null;

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.usuarioActual = this.auth.getUsuarioActual();
  }

  cerrarSesion() {
    this.auth.logout();
    this.usuarioActual = null;
  }
}
