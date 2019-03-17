import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Server } from 'src/model/server.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private url = '/api/server';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Server[]> {
    return this.http.get<Server[]>(this.url).pipe(catchError(this.handleException));
  }

  create(server: Server): Observable<Server> {
    return this.http.post<Server>(this.url, server).pipe(catchError(this.handleException));
  }

  remove(id: number): Observable<{}> {
    return this.http.delete(this.url + '/' + id, { responseType: 'text' as 'text' })
      .pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
}
