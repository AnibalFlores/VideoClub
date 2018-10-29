import { Injectable } from '@angular/core';
import { Pelicula } from '../classes/pelicula';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';


const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private pelicula$ = new Subject<Pelicula[]>();

  peliculas = this.pelicula$.asObservable();

  constructor(private http: HttpClient) {
    this.getPeliculas();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getPeliculas() {
    return this.http.get<Pelicula[]>(endpoint + 'pelicula').subscribe(p => this.pelicula$.next(p));
  }

  getPelicula(id): Observable<any> {
    return this.http.get(endpoint + 'pelicula/' + id).pipe(
      map(this.extractData));
  }

  addPelicula(pelicula: Pelicula): Observable<Pelicula> {
    // console.log(pelicula);
    return this.http.post<Pelicula>(endpoint + 'peliculas', JSON.stringify(pelicula), httpOptions).pipe(
      tap((p) => console.log(`Pelicula agregada con id=${p.id}`)),
      catchError(this.handleError<any>('addPelicula'))
    );
  }

  guardarFilm(peli: Pelicula) {
    if (peli.id == -1) {
        peli.id = null;
        return this.http.post<Pelicula>(endpoint + 'pelicula', peli);
    } else {
        return this.http.put<Pelicula>(endpoint + 'pelicula/' + peli.id, peli);
    }
}

  updatePelicula(id: number, pelicula: Pelicula): Observable<any> {
     console.log(endpoint + 'pelicula/' + id);
    return this.http.put<Pelicula>(endpoint + 'pelicula/' + id, JSON.stringify(pelicula), httpOptions).pipe(
      tap(_ => console.log(`Actualizada pelicula con id=${id}`)),
      catchError(this.handleError<any>('updatePelicula')));
  }

  deletePelicula(id: number): Observable<any> {
    return this.http.delete<Pelicula>(endpoint + 'peliculas/' + id, httpOptions).pipe(
      tap(_ => console.log(`Borrada pelicula con id=${id}`)),
      catchError(this.handleError<any>('deletePelicula'))
    );
  }

  /*search(terms: Observable<string>) {
     console.log('hago search');
     this.peliculas = terms.pipe(
     debounceTime(400),
     distinctUntilChanged(),
     filter(term => term && term.trim().length > 0),
     switchMap(term => this.searchEntries(term)));
   }*/

  searchEntries(term) {
    return this.http
    .get<Pelicula[]>(endpoint + 'pelicula?q=' + term).subscribe(p => this.pelicula$.next(p));
  }

  // handler de errores
  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar este error a la infraestructura de logging
      console.error(error); // como no tengo eso log a la console

      // TODO: Mejor si aca ponemos un mensaje entendible para un humano
      console.log(`${operation} fallo: ${error.message}`);

      // Dejamos la app funcionando devolviendo un resultado vacio.
      return of(result as T);
    };
  }
}
