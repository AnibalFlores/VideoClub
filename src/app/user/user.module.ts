import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetallesComponent } from './components/detalles/detalles.component';
import { AlquilarComponent } from './components/alquilar/alquilar.component';
import { ConfirmadoComponent } from './components/confirmado/confirmado.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [DetallesComponent, AlquilarComponent, ConfirmadoComponent]
})
export class UserModule { }
