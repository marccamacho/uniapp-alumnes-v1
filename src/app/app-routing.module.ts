import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciComponent }       from './inici/inici.component';

import { AuthService }          from './services/auth.service';

const routes: Routes = [
  { path: 'inici',        component: IniciComponent, data: {seccio: 'inici'}, canActivate: [AuthService] },
  { path: 'seguiment',    component: IniciComponent, data: {seccio: 'seguiment'}, canActivate: [AuthService] },
  { path: 'planificacio', redirectTo: 'inici', data: {seccio: 'planificacio'}, pathMatch: 'full' },
  { path: 'projectes',    redirectTo: 'inici', data: {seccio: 'projectes'}, pathMatch: 'full' },
  { path: 'material',     redirectTo: 'inici', data: {seccio: 'material'}, pathMatch: 'full' },
  { path: '',             redirectTo: 'inici', data: {seccio: 'inici'}, pathMatch: 'full' },
  { path: '**',           redirectTo: 'inici', data: {seccio: 'inici'}, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { "useHash": true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


