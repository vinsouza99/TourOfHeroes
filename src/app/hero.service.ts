import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService:MessageService,
    private http: HttpClient
    ) { }
  
  private heroesUrl = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id : number) : Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  updateHero(hero : Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero(hero:Hero): Observable<any> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(search : String): Observable<Hero[]>{
    if(search.trim()){
      return this.http.get<Hero[]>(`${this.heroesUrl}/?alias=${search}`).pipe(
        tap(x => x.length ?
           this.log(`found heroes matching "${search}"`) :
           this.log(`no heroes matching "${search}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }
    return of([]);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  private log(message:String) {
    this.messageService.add(`${message}`);
  }
} 
