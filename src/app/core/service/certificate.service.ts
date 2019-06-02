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

  getAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url).pipe(catchError(this.handleException));
  }

  getAllActive(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/active').pipe(catchError(this.handleException));
  }

  getAllCA(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/ca').pipe(catchError(this.handleException));
  }

  getAllActiveCA(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/ca/active').pipe(catchError(this.handleException));
  }

  getAllClients(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/client').pipe(catchError(this.handleException));
  }

  getAllActiveClients(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/client/active').pipe(catchError(this.handleException));
  }

  create(request: CertificateRequest): Observable<String> {
    return this.http.post(this.url, request, { responseType: 'text' }).pipe(catchError(this.handleException));
  }


  remove(id: number): Observable<String> {
    return this.http.delete(this.url + '/' + id, { responseType: 'text' })
      .pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.error);
  }
}
