import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../interface/services/data.service';
import { Pelicula } from '../interface/classes/pelicula';
import { AuthService } from '../interface/services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../interface/classes/usuario';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})

export class LandingpageComponent implements OnInit, OnDestroy {


  peliculas: Pelicula[] = [];
  subscription: Subscription;
  usuario: Usuario;

  constructor(private dataSrv: DataService, private AuthSrv: AuthService) {
    this.usuario = this.AuthSrv.hacker;
    // suscribimos a la lista de peliculas del data service
    this.subscription = this.dataSrv.peliculas.subscribe(p => this.peliculas = p);
  }

  ngOnInit(): void {
    this.dataSrv.getPeliculas();
  }

  getStars(rating) {
    // Conviertmos el puntaje en un numero/100
    const size = parseFloat(rating) / 10 * 100;
    return size + '%';
  }

  ngOnDestroy() {
    // des-suscribimos al destruir el componente no se si en los otros me olvide
    this.subscription.unsubscribe();
  }
}
