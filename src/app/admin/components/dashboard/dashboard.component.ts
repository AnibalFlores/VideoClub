import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/interface/services/auth.service';
import { Usuario } from 'src/app/interface/classes/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  constructor(private AuthSrv: AuthService) {
    this.usuario = this.AuthSrv.hacker;
   }

  ngOnInit() {

  }

}
