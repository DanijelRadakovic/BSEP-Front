import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Distribution } from 'src/app/model/cert/distribution.model';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  // private url = 'https://localhost:8082/api/dist';
  private url = '/api/dist';

  constructor(private http: HttpClient) {
  }

  distribute(dist: Distribution): Observable<String> {
    return this.http.post(this.url, dist, { responseType: 'text' }).pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.error);
  }
}
