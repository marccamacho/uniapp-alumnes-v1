import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciComponent }       from './inici/inici.component';
import { ProjectesComponent }   from './projectes/projectes.component';
import { MaterialComponent }    from './material/material.component';

import { AuthService }          from './services/auth.service';

const routes: Routes = [
  { path: 'inici',        component: IniciComponent, data: {seccio: 'inici'}, canActivate: [AuthService] },
  { path: 'seguiment',    component: IniciComponent, data: {seccio: 'seguiment'}, canActivate: [AuthService] },
  { path: 'planificacio', redirectTo: 'inici', data: {seccio: 'planificacio'}, pathMatch: 'full' },
  { path: 'projectes',    component: ProjectesComponent, data: {seccio: 'projectes'}, canActivate: [AuthService] },
  { path: 'material',     component: MaterialComponent, data: {seccio: 'material'}, canActivate: [AuthService] },
  { path: '',             redirectTo: 'inici', data: {seccio: 'inici'}, pathMatch: 'full' },
  { path: '**',           redirectTo: 'inici', data: {seccio: 'inici'}, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { "useHash": true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


