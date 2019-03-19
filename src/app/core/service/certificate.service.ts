import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Certificate } from 'src/model/certificate.model';
import { Generator } from 'src/model/generator.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private url = '/api/cer';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url).pipe(catchError(this.handleException));
  }

  create(request: Generator): Observable<{}> {
    return this.http.post<{}>(this.url, request).pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
}
