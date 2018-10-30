import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminauthService } from '../interface/services/adminauth.service';
import { FilmeditorComponent } from './components/filmeditor/filmeditor.component';
import { ConfirmaborrarComponent } from './components/confirmaborrar/confirmaborrar.component';
import { UsereditorComponent } from './components/usereditor/usereditor.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { AlquiladasListComponent } from './components/alquiladas-list/alquiladas-list.component';

const Adminroutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminauthService]
  },
  {
    path: 'peli-nueva',
    component: FilmeditorComponent,
    canActivate: [AdminauthService]
  },
  {
    path: 'pelicula-edit/:id',
    component: FilmeditorComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'user-nuevo',
    component: UsereditorComponent,
    canActivate: [AdminauthService]
  },
  {
    path: 'usuario-edit/:id',
    component: UsereditorComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'user-list',
    component: UserlistComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'borrar-peli/:id',
    component: ConfirmaborrarComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'borrar-user/:id',
    component: ConfirmaborrarComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  },
  {
    path: 'devolucion',
    component: AlquiladasListComponent,
    pathMatch: 'full',
    canActivate: [AdminauthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Adminroutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
