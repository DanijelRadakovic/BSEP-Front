import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Certificate } from 'src/model/certificate.model';
import { CertificateRequest } from 'src/model/generator.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private url = '/api/cer';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/findAll').pipe(catchError(this.handleException));
  }

  getAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url).pipe(catchError(this.handleException));
  }

  create(request: CertificateRequest): Observable<String> {
    return this.http.post(this.url, request, { responseType: 'text' }).pipe(catchError(this.handleException));
  }


  remove(id: number): Observable<String> {
    return this.http.delete(this.url + '/remove/' + id, { responseType: 'text' })
      .pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.error);
  }
}
