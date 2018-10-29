import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminauthService } from '../interface/services/adminauth.service';
import { FilmeditorComponent } from './components/filmeditor/filmeditor.component';

const Adminroutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'pelicula/nueva',
    component: FilmeditorComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'pelicula-edit/:id',
    component: FilmeditorComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Adminroutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
