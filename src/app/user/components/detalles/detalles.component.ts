import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/interface/services/data.service';
import { Pelicula } from 'src/app/interface/classes/pelicula';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, map, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  peli: Pelicula;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPelicula(this.route.snapshot.params['id']).subscribe(data => {
      this.peli = data;
      // console.log(data);
    });
  }

}
