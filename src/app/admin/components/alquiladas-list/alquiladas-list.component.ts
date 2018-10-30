import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pelicula } from 'src/app/interface/classes/pelicula';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/interface/services/data.service';

@Component({
  selector: 'app-alquiladas-list',
  templateUrl: './alquiladas-list.component.html',
  styleUrls: ['./alquiladas-list.component.scss']
})
export class AlquiladasListComponent implements OnInit, OnDestroy {

  alquiladas: Pelicula[] = [];
  subscription: Subscription;
  puntos = 8;
  puntaje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  constructor(private dataSvr: DataService) {
    this.subscription = this.dataSvr.peliculas.subscribe(p => this.alquiladas = p);
  }


  ngOnInit() {
    this.getAlquiladas();
  }

  getAlquiladas() {
    this.dataSvr.searchEntries('true');
  }

  devolverPelicula(id: number, peli: Pelicula) {
    peli.alquilada = false;
    // pseudo promedio hacemos puntaje acumulado dividido cantidad de alquileres
    // no tenemos un contador de clasificaciones de usuario por lo tanto el admin
    // coloca obligatoriamente en cada devolución un puntaje del 1 al 10 que por defecto es 8
    peli.valoracion = (peli.valoracion + this.puntos) / 2;
    this.dataSvr.updatePelicula(id, peli).subscribe(
      () => {
        alert('Pelicula devuelta');
        this.getAlquiladas();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
