import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiaComponent } from './dia/dia.component';
import { SetmanaComponent } from './setmana/setmana.component';
import { EsdevenimentComponent } from './esdeveniment/esdeveniment.component';
import { AgendaComponent } from './agenda/agenda.component';

import { FlexLayoutModule }         from '@angular/flex-layout';


@NgModule({
  declarations: [DiaComponent, SetmanaComponent, EsdevenimentComponent, AgendaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [AgendaComponent]
})
export class AgendaModule { }
