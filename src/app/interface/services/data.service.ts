import { Injectable } from '@angular/core';
import { Pelicula } from '../classes/pelicula';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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

  peliculas: Observable<Pelicula[]>;

  constructor(private http: HttpClient) {
    this.peliculas = this.getPeliculas();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getPeliculas(): Observable<any> {
    return this.http.get(endpoint + 'pelicula').pipe(
      map(this.extractData));
  }

  getPelicula(id): Observable<any> {
    return this.http.get(endpoint + 'pelicula/' + id).pipe(
      map(this.extractData));
  }

  addPelicula(pelicula): Observable<any> {
    console.log(pelicula);
    return this.http.post<any>(endpoint + 'peliculas', JSON.stringify(pelicula), httpOptions).pipe(
      tap((pelicula) => console.log(`added pelicula w/ id=${pelicula.id}`)),
      catchError(this.handleError<any>('addPelicula'))
    );
  }

  updatePelicula(id, pelicula): Observable<any> {
    return this.http.put(endpoint + 'peliculas/' + id, JSON.stringify(pelicula), httpOptions).pipe(
      tap(_ => console.log(`updated pelicula id=${id}`)),
      catchError(this.handleError<any>('updatePelicula'))
    );
  }

  deletePelicula(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'peliculas/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted pelicula id=${id}`)),
      catchError(this.handleError<any>('deletePelicula'))
    );
  }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
