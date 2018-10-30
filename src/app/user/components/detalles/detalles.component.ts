import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/interface/services/data.service';
import { Pelicula } from 'src/app/interface/classes/pelicula';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/interface/services/auth.service';
import { Usuario } from 'src/app/interface/classes/usuario';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  peli: Pelicula;
  user: Usuario;
  constructor(private route: ActivatedRoute, private dataService: DataService, private authSrv: AuthService) {
    this.user = this.authSrv.hacker;
   }

  ngOnInit() {
    this.dataService.getPelicula(this.route.snapshot.params['id']).subscribe(data => {
      this.peli = data;
      // console.log(data);
    });
  }

}
