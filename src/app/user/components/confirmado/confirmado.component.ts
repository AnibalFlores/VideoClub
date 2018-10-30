import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/interface/services/data.service';
import { Pelicula } from 'src/app/interface/classes/pelicula';


@Component({
  selector: 'app-confirmado',
  templateUrl: './confirmado.component.html',
  styleUrls: ['./confirmado.component.scss']
})
export class ConfirmadoComponent implements OnInit {

  peli: Pelicula;
  fecha: Date;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPelicula(this.route.snapshot.params['id']).subscribe(data => {
    this.peli = data;
    this.fecha = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
  });
  }


}
