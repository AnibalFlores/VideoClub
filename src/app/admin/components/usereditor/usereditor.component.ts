import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/interface/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/interface/services/auth.service';
import { Usuario } from 'src/app/interface/classes/usuario';

@Component({
  selector: 'app-usereditor',
  templateUrl: './usereditor.component.html',
  styleUrls: ['./usereditor.component.scss']
})
export class UsereditorComponent implements OnInit {
  nuevo = false;
  titulo = 'nada';
  usuario: Usuario;
  editor: Usuario; // este es el admin

  estados = [
    { id: true, name: 'Activo' },
    { id: false, name: 'De Baja' }
   ];
  password = '';
  verificador = '';

  constructor(private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {
    this.editor = this.authSrv.hacker;
  }

  guardarUser() {
    if (this.password === this.verificador) {
    this.usuario.clave = this.password;
    // this.usuario.telefono = +this.telefonos;
    this.authSrv.guardarUsuario(this.usuario).subscribe(
      (p) => this.router.navigate(['/user-list']),
      error => alert('Error al guardar la pelicula: ' + error)
    ); } else {
      alert('Contraseña distinta a su verificacion. Vuelva a intentar');
    }

  }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'user-nuevo';
    if (this.nuevo) {
      this.usuario = new Usuario();
      this.usuario.id = -1;
      this.usuario.estado = true;
      this.titulo = 'Nuevo Usuario';
    } else {
      this.authSrv.getUsuario(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (u: Usuario) => {
          this.usuario = u;
          // this.password = u.contraseña;
          this.verificador = u.clave;
          // this.telefonos = '' + u.teléfono;
        },
        error => console.log(error));
      this.titulo = 'Editar Usuario';
    }
  }

}
