import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../interface/services/data.service';
import { Pelicula } from '../interface/classes/pelicula';
import { AuthService } from '../interface/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})

export class LandingpageComponent implements OnInit, OnDestroy {


  peliculas: Pelicula[] = [];
  subscription: Subscription;

  constructor(private dataSrv: DataService, private AuthSrv: AuthService) {

    this.subscription = dataSrv.peliculas.subscribe(
      p => this.peliculas = p);
  }

  ngOnInit(): void {
    this.dataSrv.getPeliculas();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
