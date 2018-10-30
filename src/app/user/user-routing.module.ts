import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { LoginComponent } from '../login/login.component';
import { UserauthService } from '../interface/services/userauth.service';
import { AlquilarComponent } from './components/alquilar/alquilar.component';
import { ConfirmadoComponent } from './components/confirmado/confirmado.component';

const Userroutes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing',
    component: LandingpageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AdminauthService, UserauthService]
  },
  {
    path: 'pelicula-details/:id',
    pathMatch: 'full',
    component: DetallesComponent
  },
  {
    path: 'pelicula-rent/:id',
    pathMatch: 'full',
    component: AlquilarComponent,
    canActivate: [UserauthService]
  },
  {
    path: 'rent-confirmed/:id',
    pathMatch: 'full',
    component: ConfirmadoComponent,
    canActivate: [UserauthService]
  }


];

@NgModule({
  imports: [RouterModule.forChild(Userroutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
