import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/interface/services/data.service';
import { Pelicula } from 'src/app/interface/classes/pelicula';

@Component({
  selector: 'app-filmeditor',
  templateUrl: './filmeditor.component.html',
  styleUrls: ['./filmeditor.component.scss']
})
export class FilmeditorComponent implements OnInit {

  peli: Pelicula;
  nuevo = false;
  titulo = 'nada';

  constructor(private dataSrv: DataService,
              private ruta: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() == 'nueva';
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
