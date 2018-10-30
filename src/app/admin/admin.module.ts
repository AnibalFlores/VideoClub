import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmeditorComponent } from './components/filmeditor/filmeditor.component';
import { UsereditorComponent } from './components/usereditor/usereditor.component';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmaborrarComponent } from './components/confirmaborrar/confirmaborrar.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlquiladasListComponent } from './components/alquiladas-list/alquiladas-list.component';
import { HelpersModule } from '../helpers/helpers.module';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    NgxPaginationModule,
    HelpersModule
  ],
  declarations: [
    DashboardComponent,
    FilmeditorComponent,
    UsereditorComponent,
    ConfirmaborrarComponent,
    UserlistComponent,
    AlquiladasListComponent]
})
export class AdminModule { }
