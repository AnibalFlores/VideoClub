import { Component } from '@angular/core';
import { Usuario } from './interface/classes/usuario';
import { DataService } from './interface/services/data.service';
import { AuthService } from './interface/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'VideoClub';
  usuario: Usuario;
  esListaUsers = false;
  buscador = false;

  constructor(private dataSrv: DataService, private AuthSrv: AuthService, private router: Router) {
    // quien es el usuario actual?
    this.AuthSrv.logged.subscribe(u => this.usuario = u);
    // suscribo a los paths finales para mostrar el buscador solo donde es funcional
    this.router.events
      .subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          this.buscador = (ev.url === '/landing' || ev.url === '/user-list') ? true : false;
        }
      });

  }
  // determinamos si la busqueda corresponde a peliculas o usuarios en base a la pagina actual
  buscarTermino(query: string) {
    // console.log(this.router.isActive('/user-list', true));
    if (this.router.isActive('/user-list', true)) { this.AuthSrv.searchEntries(query); } else {
      this.dataSrv.searchEntries(query);
    }
  }

  desloguear() {
    this.AuthSrv.logout();
    alert('Te has deslogueado');
    this.dataSrv.getPeliculas();
    // deslogueado quedamos en pagina de login
    this.router.navigate(['login']);
  }


}
