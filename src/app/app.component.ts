import { Component } from '@angular/core';
import { Usuario } from './interface/classes/usuario';
import { DataService } from './interface/services/data.service';
import { AuthService } from './interface/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'VideoClub';
  usuario: Usuario;


  constructor(private dataSrv: DataService, private AuthSrv: AuthService) {
    this.AuthSrv.logged.subscribe(u => this.usuario = u);

  }

  buscarTermino(query: string) {
    this.dataSrv.searchEntries(query);
  }

  desloguear() {
    this.AuthSrv.logout();
    this.usuario = undefined;
    alert('Te has deslogueado');
    this.dataSrv.getPeliculas();
  }

}
