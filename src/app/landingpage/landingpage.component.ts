import { Component, OnInit } from '@angular/core';
import { DataService } from '../interface/services/data.service';
import { Pelicula } from '../interface/classes/pelicula';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private dataservice: DataService) {
    this.dataservice.peliculas
    .subscribe(peliculas => {
        this.peliculas = peliculas as Pelicula[];
    });
   }

alquilar(id: number) {
  console.log(id);
}
  ngOnInit() {
  }

}
