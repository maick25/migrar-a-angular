import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header'
import { InicioComponent } from './components/inicio/inicio';
import { NosotrosComponent } from './components/nosotros/nosotros';
import { ServiciosComponent } from './components/servicios/servicios';
import { AlimentacionComponent } from './components/alimentacion/alimentacion';
import { ActividadComponent } from './components/actividad/actividad';
import { TestEmocionalComponent } from './components/test-emocional/test-emocional';
import { PqrComponent } from './components/pqr/pqr';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    InicioComponent,
    NosotrosComponent,
    ServiciosComponent,
    AlimentacionComponent,
    ActividadComponent,
    TestEmocionalComponent,
    PqrComponent,
    FooterComponent
  ],
  templateUrl: './app.html', //  tener  template y estilos vinculados
  styleUrls: ['./app.css']
})
export class AppComponent { title = 'cuerpo-y-alma';}
 
