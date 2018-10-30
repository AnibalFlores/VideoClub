import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/interface/services/data.service';
import { Pelicula } from 'src/app/interface/classes/pelicula';
import { Usuario } from 'src/app/interface/classes/usuario';
import { AuthService } from 'src/app/interface/services/auth.service';

@Component({
  selector: 'app-filmeditor',
  templateUrl: './filmeditor.component.html',
  styleUrls: ['./filmeditor.component.scss']
})
export class FilmeditorComponent implements OnInit {

  peli: Pelicula;
  nuevo = false;
  titulo = 'nada';
  usuario: Usuario;

  generos = [
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Ciencia Ficción' },
    { id: 3, name: 'Comedia' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Terror' },
    { id: 6, name: 'Western' },
    { id: 7, name: 'XXX' }

  ];



  constructor(private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {
    this.usuario = this.authSrv.hacker;
  }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'peli-nueva';
    if (this.nuevo) {
      this.peli = new Pelicula(-1, '', '', '', '', false, 10, 0);
      this.titulo = 'Nueva Pelicula';
    } else {
      this.dataSrv.getPelicula(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (p: Pelicula) => {
          this.peli = p;
          // this.contacto.fechaNac = new Date(c.fechaNac)
        },
        error => console.log(error));
      this.titulo = 'Editar Pelicula';
    }
  }

  guardarPeli() {
    this.dataSrv.guardarFilm(this.peli).subscribe(
      (p) => this.router.navigate(['/']),
      error => alert('Error al guardar la pelicula: ' + error)
    );
  }


}
