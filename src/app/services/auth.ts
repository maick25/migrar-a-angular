import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Usuario } from './api';

@Injectable({ providedIn: 'root' })
export class Auth {
  private baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`).pipe(
      map((usuarios: Usuario[]) => {
        const encontrado = usuarios.find(
          (u: Usuario) => u.correo === correo && u.password === password
        );
        return encontrado || null;
      }),
      tap((usuario: Usuario | null) => {
        if (usuario) {
          const token = btoa(`${usuario.id}:${usuario.correo}:${Date.now()}`);
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', JSON.stringify(usuario));
        }
      })
    );
  }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, usuario).pipe(
      tap((u: Usuario) => {
        const token = btoa(`${u.id}:${u.correo}:${Date.now()}`);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(u));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioActual(): Usuario | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  esAdmin(): boolean {
    return this.getUsuarioActual()?.rol === 'admin';
  }
}
