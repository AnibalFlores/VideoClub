import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../classes/usuario';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError, map, find } from 'rxjs/operators';

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

  private user$ = new Subject<Usuario>(); // controlo con next el casteo de user
  logged = this.user$.asObservable(); // observable publico del usuario
  hacker: Usuario; // así le llamo al usuario que intenta loguear
  // lista de usuarios para operar en login
  usersActivos: Usuario[];
  private listadoUser$ = new Subject<Usuario[]>();
  listadoUsuario = this.listadoUser$.asObservable();

  constructor(private http: HttpClient) {
    // me traigo un listado de usuarios
    this.getUsuariosActivos();
  }

  // intercepto las respuestas del servidor para tener los cuerpos
  private extractData(res: Response) {
    const body = res;
    return body || {}; // devuelvo el body si esta definido o vacio
  }

  searchEntries(term) {
    this.http.get<Usuario[]>(endpoint + 'usuario?q=' + term).subscribe(u => this.listadoUser$.next(u));
  }

  guardarUsuario(user: Usuario): any {
    if (user.id === -1) {
      user.id = null;
      return this.http.post<Usuario>(endpoint + 'usuario', user).pipe(
        tap(u => console.log(`Agregado usuario con id=${u.id}`)),
        catchError(this.handleError<any>('postNuevoUsuario'))
      );
    } else {
      return this.http.put<Usuario>(endpoint + 'usuario/' + user.id, user).pipe(
        tap(u => console.log(`Actualizado usuario con id=${u.id}`)),
        catchError(this.handleError<any>('putUpdateUsuario'))
      );
    }
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<Usuario>(endpoint + 'usuario/' + id, httpOptions).pipe(
      tap(_ => console.log(`Borrado usuario con id=${id}`)),
      catchError(this.handleError<any>('deleteUsuario'))
    );
  }

  getUsuario(id): Observable<any> {
    return this.http.get(endpoint + 'usuario/' + id).pipe(
      map(this.extractData));
  }

  getUsuariosActivos() {
    this.http.get<Usuario[]>(endpoint + 'usuario?estado=true', httpOptions)
      .subscribe(u => this.usersActivos = u,
        error => {
          alert('No se puedieron traer los usuarios' + error);
        }
      );

  }

  getUsers() { // obtengo listado en array para implementar el fake authentication
    this.http.get<Usuario[]>(endpoint + 'usuario', httpOptions)
      .subscribe(u => this.listadoUser$.next(u),
        error => {
          alert('No se puedieron traer los usuarios' + error);
        }
      );
  }

  getListado() { // A diferencia de getusers aca retorno un observable para editar los usuarios
    return this.http.get<Usuario[]>(endpoint + 'usuario', httpOptions);
  }



  // TODO: Este login es totalmente fake ya que deberia resolverse con un post encriptado y tokens al server

  login(username: string, pass: string): boolean {
    // Pedimos una lista fresca nuevamente
    // por lo que puede fallar el primer intento si el admin edita la clave de algun usuario
    this.getUsuariosActivos();
    // aca vemos de los activos si usuario y clave son los correctos
    // (para el id = 1 lo reservamos para el Admin user y no es borrable!)
    // this.listadoUser$.forEach(us => this.hacker = us.find(u => u.usuario === username && u.contraseña === pass && u.estado));
    this.hacker = this.usersActivos.find(u => u.usuario === username && u.contraseña === pass);
    // mandamos el usuario al subject object
    this.user$.next(this.hacker);
    this.logged = this.user$.asObservable();
    // console.log(this.hacker);
    return (this.hacker !== undefined); // si tengo un logueado devuelve true
  }

  logout() {
    // el orden es importante aquí
    this.hacker = undefined;
    this.user$.next(this.hacker);
    // this.logged = this.user$.asObservable();
  }

  // metodo consumido por adminAuth service que implementa canActivate
  isAdmin() {
    if (this.hacker && this.hacker.id === 1) { return true; } else { return false; }
  }

  // metodo consumido por userAuth service que implementa canActivate
  isUser() {
    if (this.hacker && this.hacker.id !== 1) { return true; } else { return false; }
  }

  // handler de errores
  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Mejor si aca pusiera un mensaje entendible para un humano
      console.log(`${operation} fallo: ${error.message}`);

      // TODO: enviar este error a la infraestructura de logs
      console.error(error); // como no tengo eso... log a la consola nomas

      // Dejamos la app funcionando devolviendo un observable de lo que sea.
      return of(result as T);
    };
  }
}
