import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';

const Userroutes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    pathMatch: 'full'
  },
  {
    path: 'pelicula-details/:id',
    pathMatch: 'full',
    component: DetallesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(Userroutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
