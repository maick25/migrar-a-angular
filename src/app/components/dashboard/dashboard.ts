import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api, Usuario, Consejo, Cita, Habito } from '../../services/api';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  seccionActiva = 'usuarios';
  usuarioActual: Usuario | null = null;
  esAdmin = false;

  // Admin - Usuarios
  usuarios: Usuario[] = [];
  usuarioForm: Usuario = { nombre: '', correo: '', password: '', rol: 'usuario' };
  editandoUsuario = false;
  usuarioEditandoId = '';

  // Admin - Consejos
  consejos: Consejo[] = [];
  consejoForm: Consejo = { titulo: '', descripcion: '', categoria: 'bienestar', autor: '' };
  editandoConsejo = false;
  consejoEditandoId = '';

  // Admin - Citas
  todasCitas: Cita[] = [];

  // Admin - Stats
  stats = { totalUsuarios: 0, totalConsejos: 0, totalCitas: 0, citasPendientes: 0 };

  // Usuario - Citas
  misCitas: Cita[] = [];
  citaForm: Cita = { nombre: '', correo: '', fecha: '', hora: '', tipo: 'psicologia', motivo: '', estado: 'pendiente' };
  citaEnviada = false;

  // Usuario - Habitos
  hoy = new Date().toISOString().split('T')[0];
  habitoHoy: Habito = { usuarioId: '', fecha: '', agua: false, ejercicio: false, sueno: false, meditacion: false, alimentacion: false };
  habitoGuardado = false;
  historialHabitos: Habito[] = [];

  // Usuario - Test bienestar
  testActivo = false;
  preguntaActual = 0;
  respuestas: number[] = [];
  resultadoTest = '';
  preguntas = [
    { texto: '¿Cómo calificarías tu nivel de energía hoy?', opciones: ['Muy bajo', 'Bajo', 'Regular', 'Bueno', 'Excelente'] },
    { texto: '¿Cómo está tu estado de ánimo?', opciones: ['Muy mal', 'Mal', 'Regular', 'Bien', 'Muy bien'] },
    { texto: '¿Dormiste bien anoche?', opciones: ['Nada', 'Poco', 'Regular', 'Bien', 'Muy bien'] },
    { texto: '¿Has hecho actividad física esta semana?', opciones: ['Nada', 'Muy poco', 'Algo', 'Bastante', 'Mucho'] },
    { texto: '¿Cómo evalúas tu alimentación hoy?', opciones: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Excelente'] }
  ];

  mensaje = '';
  tipoMensaje = 'ok';

  constructor(private api: Api, private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.usuarioActual = this.auth.getUsuarioActual();
    this.esAdmin = this.auth.esAdmin();
    this.consejoForm.autor = this.usuarioActual?.nombre || 'Admin';

    if (this.esAdmin) {
      this.seccionActiva = 'stats';
      this.cargarTodo();
    } else {
      this.seccionActiva = 'citas';
      this.citaForm.nombre = this.usuarioActual?.nombre || '';
      this.citaForm.correo = this.usuarioActual?.correo || '';
      this.cargarMisCitas();
      this.cargarHabitoHoy();
    }
  }

  mostrarMensaje(texto: string, tipo = 'ok') {
    this.mensaje = texto; this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3500);
  }

  cargarTodo() {
    this.cargarUsuarios(); this.cargarConsejos(); this.cargarTodasCitas();
  }

  // ── USUARIOS ──
  cargarUsuarios() {
    this.api.getUsuarios().subscribe(d => {
      this.usuarios = d; this.stats.totalUsuarios = d.length;
    });
  }
  guardarUsuario() {
    if (!this.usuarioForm.nombre || !this.usuarioForm.correo || !this.usuarioForm.password) {
      this.mostrarMensaje('Completa todos los campos.', 'error'); return;
    }
    if (this.editandoUsuario) {
      this.api.actualizarUsuario(this.usuarioEditandoId, this.usuarioForm).subscribe(() => {
        this.mostrarMensaje('✅ Usuario actualizado.'); this.cancelarUsuario(); this.cargarUsuarios();
      });
    } else {
      this.api.crearUsuario(this.usuarioForm).subscribe(() => {
        this.mostrarMensaje('✅ Usuario creado.'); this.cancelarUsuario(); this.cargarUsuarios();
      });
    }
  }
  editarUsuario(u: Usuario) { this.usuarioForm = {...u}; this.usuarioEditandoId = u.id!; this.editandoUsuario = true; window.scrollTo(0,0); }
  eliminarUsuario(id: string) {
    if (confirm('¿Eliminar este usuario?')) {
      this.api.eliminarUsuario(id).subscribe(() => { this.mostrarMensaje('🗑️ Usuario eliminado.'); this.cargarUsuarios(); });
    }
  }
  cancelarUsuario() { this.usuarioForm = { nombre:'', correo:'', password:'', rol:'usuario' }; this.editandoUsuario = false; this.usuarioEditandoId = ''; }

  // ── CONSEJOS ──
  cargarConsejos() {
    this.api.getConsejos().subscribe(d => { this.consejos = d; this.stats.totalConsejos = d.length; });
  }
  guardarConsejo() {
    if (!this.consejoForm.titulo || !this.consejoForm.descripcion) {
      this.mostrarMensaje('Completa título y descripción.', 'error'); return;
    }
    if (this.editandoConsejo) {
      this.api.actualizarConsejo(this.consejoEditandoId, this.consejoForm).subscribe(() => {
        this.mostrarMensaje('✅ Consejo actualizado.'); this.cancelarConsejo(); this.cargarConsejos();
      });
    } else {
      this.api.crearConsejo(this.consejoForm).subscribe(() => {
        this.mostrarMensaje('✅ Consejo creado.'); this.cancelarConsejo(); this.cargarConsejos();
      });
    }
  }
  editarConsejo(c: Consejo) { this.consejoForm = {...c}; this.consejoEditandoId = c.id!; this.editandoConsejo = true; window.scrollTo(0,0); }
  eliminarConsejo(id: string) {
    if (confirm('¿Eliminar este consejo?')) {
      this.api.eliminarConsejo(id).subscribe(() => { this.mostrarMensaje('🗑️ Consejo eliminado.'); this.cargarConsejos(); });
    }
  }
  cancelarConsejo() { this.consejoForm = { titulo:'', descripcion:'', categoria:'bienestar', autor: this.usuarioActual?.nombre||'Admin' }; this.editandoConsejo = false; this.consejoEditandoId = ''; }

  // ── CITAS ADMIN ──
  cargarTodasCitas() {
    this.api.getCitas().subscribe(d => {
      this.todasCitas = d;
      this.stats.totalCitas = d.length;
      this.stats.citasPendientes = d.filter(c => c.estado === 'pendiente').length;
    });
  }
  cambiarEstadoCita(cita: Cita, estado: string) {
    this.api.actualizarCita(cita.id!, {...cita, estado}).subscribe(() => {
      this.mostrarMensaje('✅ Estado actualizado.'); this.cargarTodasCitas();
    });
  }
  eliminarCita(id: string) {
    if (confirm('¿Eliminar esta cita?')) {
      this.api.eliminarCita(id).subscribe(() => { this.mostrarMensaje('🗑️ Cita eliminada.'); this.cargarTodasCitas(); });
    }
  }

  // ── CITAS USUARIO ──
  cargarMisCitas() {
    if (this.usuarioActual?.correo) {
      this.api.getCitasPorCorreo(this.usuarioActual.correo).subscribe(d => this.misCitas = d);
    }
  }
  agendarCita() {
    if (!this.citaForm.fecha || !this.citaForm.hora || !this.citaForm.motivo) {
      this.mostrarMensaje('Completa todos los campos.', 'error'); return;
    }
    this.api.crearCita(this.citaForm).subscribe(() => {
      this.citaEnviada = true;
      this.mostrarMensaje('✅ Cita agendada correctamente.');
      this.cargarMisCitas();
    });
  }
  nuevaCita() {
    this.citaForm = { nombre: this.usuarioActual?.nombre||'', correo: this.usuarioActual?.correo||'', fecha:'', hora:'', tipo:'psicologia', motivo:'', estado:'pendiente' };
    this.citaEnviada = false;
  }

  // ── HABITOS ──
  cargarHabitoHoy() {
    if (!this.usuarioActual?.id) return;
    this.api.getHabitosPorUsuario(this.usuarioActual.id).subscribe(d => {
      this.historialHabitos = d;
      const hoyHabito = d.find(h => h.fecha === this.hoy);
      if (hoyHabito) { this.habitoHoy = hoyHabito; this.habitoGuardado = true; }
      else {
        this.habitoHoy = { usuarioId: this.usuarioActual!.id!, fecha: this.hoy, agua: false, ejercicio: false, sueno: false, meditacion: false, alimentacion: false };
      }
    });
  }
  guardarHabitos() {
    if (this.habitoHoy.id) {
      this.api.actualizarHabito(this.habitoHoy.id, this.habitoHoy).subscribe(() => {
        this.habitoGuardado = true; this.mostrarMensaje('✅ Hábitos actualizados.');
      });
    } else {
      this.api.crearHabito(this.habitoHoy).subscribe(h => {
        this.habitoHoy = h; this.habitoGuardado = true; this.mostrarMensaje('✅ Hábitos guardados.');
        this.cargarHabitoHoy();
      });
    }
  }
  get puntajeHabitos(): number {
    const h = this.habitoHoy;
    return [h.agua, h.ejercicio, h.sueno, h.meditacion, h.alimentacion].filter(Boolean).length;
  }

  // ── TEST BIENESTAR ──
  iniciarTest() { this.testActivo = true; this.preguntaActual = 0; this.respuestas = []; this.resultadoTest = ''; }
  responder(valor: number) {
    this.respuestas[this.preguntaActual] = valor;
    if (this.preguntaActual < this.preguntas.length - 1) { this.preguntaActual++; }
    else { this.calcularResultado(); }
  }
  calcularResultado() {
    const total = this.respuestas.reduce((a, b) => a + b, 0);
    const promedio = total / this.preguntas.length;
    if (promedio >= 4) this.resultadoTest = '🌟 Excelente';
    else if (promedio >= 3) this.resultadoTest = '😊 Bueno';
    else if (promedio >= 2) this.resultadoTest = '😐 Regular';
    else this.resultadoTest = '😔 Necesitas atención';
    this.testActivo = false;
  }
  reiniciarTest() { this.respuestas = []; this.resultadoTest = ''; this.preguntaActual = 0; }

  cerrarSesion() { this.auth.logout(); this.router.navigate(['/login']); }
}
