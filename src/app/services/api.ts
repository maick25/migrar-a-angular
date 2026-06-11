import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: string;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
}

export interface Consejo {
  id?: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  autor: string;
}

export interface Cita {
  id?: string;
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  tipo: string;
  motivo: string;
  estado: string;
}

export interface Habito {
  id?: string;
  usuarioId: string;
  fecha: string;
  agua: boolean;
  ejercicio: boolean;
  sueno: boolean;
  meditacion: boolean;
  alimentacion: boolean;
}

@Injectable({ providedIn: 'root' })
export class Api {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  // USUARIOS
  getUsuarios(): Observable<Usuario[]> { return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`); }
  getUsuarioPorId(id: string): Observable<Usuario> { return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`); }
  crearUsuario(u: Usuario): Observable<Usuario> { return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, u); }
  actualizarUsuario(id: string, u: Usuario): Observable<Usuario> { return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${id}`, u); }
  eliminarUsuario(id: string): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`); }

  // CONSEJOS
  getConsejos(): Observable<Consejo[]> { return this.http.get<Consejo[]>(`${this.baseUrl}/consejos`); }
  getConsejoPorId(id: string): Observable<Consejo> { return this.http.get<Consejo>(`${this.baseUrl}/consejos/${id}`); }
  crearConsejo(c: Consejo): Observable<Consejo> { return this.http.post<Consejo>(`${this.baseUrl}/consejos`, c); }
  actualizarConsejo(id: string, c: Consejo): Observable<Consejo> { return this.http.put<Consejo>(`${this.baseUrl}/consejos/${id}`, c); }
  eliminarConsejo(id: string): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/consejos/${id}`); }

  // CITAS
  getCitas(): Observable<Cita[]> { return this.http.get<Cita[]>(`${this.baseUrl}/citas`); }
  getCitasPorCorreo(correo: string): Observable<Cita[]> { return this.http.get<Cita[]>(`${this.baseUrl}/citas?correo=${correo}`); }
  crearCita(c: Cita): Observable<Cita> { return this.http.post<Cita>(`${this.baseUrl}/citas`, c); }
  actualizarCita(id: string, c: Cita): Observable<Cita> { return this.http.put<Cita>(`${this.baseUrl}/citas/${id}`, c); }
  eliminarCita(id: string): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/citas/${id}`); }

  // HABITOS
  getHabitos(): Observable<Habito[]> { return this.http.get<Habito[]>(`${this.baseUrl}/habitos`); }
  getHabitosPorUsuario(usuarioId: string): Observable<Habito[]> { return this.http.get<Habito[]>(`${this.baseUrl}/habitos?usuarioId=${usuarioId}`); }
  crearHabito(h: Habito): Observable<Habito> { return this.http.post<Habito>(`${this.baseUrl}/habitos`, h); }
  actualizarHabito(id: string, h: Habito): Observable<Habito> { return this.http.put<Habito>(`${this.baseUrl}/habitos/${id}`, h); }
}
