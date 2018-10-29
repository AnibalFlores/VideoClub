import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interface/classes/pelicula';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/interface/services/data.service';
import { AlertService } from 'src/app/interface/services/alert.service';

@Component({
  selector: 'app-alquilar',
  templateUrl: './alquilar.component.html',
  styleUrls: ['./alquilar.component.scss']
})
export class AlquilarComponent implements OnInit {

  peli: Pelicula;

  constructor(private alert: AlertService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPelicula(this.route.snapshot.params['id']).subscribe(data => {
      this.peli = data;
    });
  }

  confirmar() {
    if (this.peli.alquilada) { 
      this.alert.error('La pelicula ya esta alquilada');
      this.router.navigate(['/rent-confirmed/' + this.peli.id]);
    }

    this.peli.alquilada = true;
    this.peli.cantidadAlquileres++;
    this.dataService.updatePelicula(this.peli.id, this.peli).subscribe(data => {
      // console.log(data);
      this.router.navigate(['/rent-confirmed/' + data.id]);
    });
  }
}
