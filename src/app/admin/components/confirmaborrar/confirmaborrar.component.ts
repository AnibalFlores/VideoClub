import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/interface/services/auth.service';
import { DataService } from 'src/app/interface/services/data.service';
import { Usuario } from 'src/app/interface/classes/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmaborrar',
  templateUrl: './confirmaborrar.component.html',
  styleUrls: ['./confirmaborrar.component.scss']
})
export class ConfirmaborrarComponent implements OnInit {

  usuario: Usuario;
  private esunapeli = false;
  private id;
  titulo = 'Nada';

  constructor(private authSrv: AuthService,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) {
    this.usuario = this.authSrv.hacker;
  }

  siBorrar() {
    if (this.esunapeli) {
      console.log('llamando para borrar id: ' + this.id );
      this.dataSrv.deletePelicula(this.id).subscribe(res => alert('Película Borrada'));
    } else {
      if (this.id !== 1) {
        this.authSrv.deleteUsuario(this.id).subscribe(res => alert('Usuario Borrado'));
      } else { alert('El usuario admin no puede borrarse'); }
    }
    this.router.navigate(['/dashboard']);
  }

  noAtras() {
    if (this.esunapeli) {
      this.router.navigate(['/pelicula-edit/' + this.id]);
    } else {
      this.router.navigate(['/editaruser/' + this.id]);
    }
  }

  ngOnInit() {
    this.esunapeli = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 2].toString() == 'borrar-peli';
    console.log(this.ruta.snapshot.url[this.ruta.snapshot.url.length - 2].toString());
    this.id = +this.ruta.snapshot.paramMap.get('id');
    if (this.esunapeli) {
      this.titulo = 'Seguro desea borrar pelicula: ' + this.id + ' ?';
    } else {
      this.titulo = 'Seguro desea borrar usuario: ' + this.id + ' ?';
    }
  }
}
