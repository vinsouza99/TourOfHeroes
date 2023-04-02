import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  private commentsUrl = 'api/comments';  // URL to web api
  private commentsQuantity:number = 0;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCommentsOfHero(heroId:number):Observable<Comment[]>{
    const url = `${this.commentsUrl}/?heroId=${heroId}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        catchError(this.handleError<Comment[]>(`getComments heroId=${heroId}`))
      );
  }
  addUpVote(commentId:number):void {

  }
  addDownVote(commentId:number):void {

  }
  addComment(comment:Comment):void {
    this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
    
      return of(result as T);
    };
  }
}
