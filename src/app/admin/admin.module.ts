import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmeditorComponent } from './components/filmeditor/filmeditor.component';
import { UsereditorComponent } from './components/usereditor/usereditor.component';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [DashboardComponent, FilmeditorComponent, UsereditorComponent]
})
export class AdminModule { }
