import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Inicio } from './components/inicio/inicio';
import { Nosotros } from './components/nosotros/nosotros';
import { Servicios } from './components/servicios/servicios';
import { Alimentacion } from './components/alimentacion/alimentacion';
import { Actividad } from './components/actividad/actividad';
import { TestEmocional } from './components/test-emocional/test-emocional';
import { Pqr } from './components/pqr/pqr';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Inicio, Nosotros, Servicios, Alimentacion, Actividad, TestEmocional, Pqr, Footer],
  template: `
    <app-header></app-header>
    <app-inicio></app-inicio>
    <app-nosotros></app-nosotros>
    <app-servicios></app-servicios>
    <app-alimentacion></app-alimentacion>
    <app-actividad></app-actividad>
    <app-test-emocional></app-test-emocional>
    <app-pqr></app-pqr>
    <app-footer></app-footer>
  `
})
export class AppHome {}
