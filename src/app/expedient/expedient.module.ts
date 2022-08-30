import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaExpedientComponent } from './vista-expedient/vista-expedient.component';
import { SharedModule } from '../shared/shared.module';
import { VistaMateriaAlumnesComponent } from './vista-materia-alumnes/vista-materia-alumnes.component';
import { VistaTutorComponent } from './vista-tutor/vista-tutor.component';
// import { TimeAgoPipe } from '../shared/pipes/time-ago-pipe';



@NgModule({
  declarations: [VistaExpedientComponent, VistaMateriaAlumnesComponent, VistaTutorComponent],
  imports: [
    CommonModule,
    SharedModule
    // TimeAgoPipe
  ]
})
export class ExpedientModule { }
