import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/interface/classes/usuario';
import { AuthService } from 'src/app/interface/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {

    usuarios: Usuario[] = [];
    subscription: Subscription;

    constructor(private authSvr: AuthService) {
        this.subscription = this.authSvr.listadoUsuario.subscribe(p => this.usuarios = p);
    }


    ngOnInit() {
        this.getUsuarios();
    }

    getUsuarios() {
        this.authSvr.searchEntries(' ');
    }

    borrarUsuario(id: number) {
        this.authSvr.deleteUsuario(id).subscribe(
            () => {
                alert('Contacto borrado');
                this.getUsuarios();
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
