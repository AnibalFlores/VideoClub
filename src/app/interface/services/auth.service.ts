import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../classes/usuario';
import { Observable, of, Subject } from 'rxjs';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<Usuario>();
  logged = this.user$.asObservable();
  private hacker: Usuario;
  private users: Usuario[];

  constructor(private http: HttpClient) {
    // me traigo un listado de usuarios
    this.getUsers();
  }

  // intercepto las respuestas del servidor para tener los cuerpos
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  /*private getUsers(): Observable<any> {
   return this.http.get(endpoint + 'usuario').pipe(
     map(this.extractData));
  }*/

  getUsers() {
    this.http.get<Usuario[]>(endpoint + 'usuario', httpOptions).subscribe(u => this.users = u);
  }

  // TODO: Este login es totalmente fake ya que deberia resolverse con un post y encriptado en el server
  login(username: string, pass: string): boolean {
    // aca vemos si usuario y clave son los correctos (para el id=1 lo consideramos el admin user y no es borrable)
    this.hacker = this.users.find(u => u.usuario === username && u.contraseña === pass);
    // mandamos el usuario al subject
    this.user$.next(this.hacker);
    return (this.hacker !== undefined); // si tengo un logueado devuelve true
  }

  logout() {
    this.logged = undefined;
    this.hacker = undefined;
  }

  // metodo consumido por adminauth service que implementa canActivate
  isAdmin(): boolean {
    return (this.hacker !== undefined && this.hacker.id === 1);
  }

  // metodo consumido por userauth service que implementa canActivate
  isUser(): boolean {
    return (this.hacker !== undefined && this.hacker.id !== 1);
  }

  // handler de errores
  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar este error a la infraestructura de logs
      console.error(error); // como no tengo eso... log a la consola nomas

      // TODO: Mejor si aca pusiera un mensaje entendible para un humano
      console.log(`${operation} fallo: ${error.message}`);

      // Dejamos la app funcionando devolviendo un resultado vacio.
      return of(result as T);
    };
  }
}
