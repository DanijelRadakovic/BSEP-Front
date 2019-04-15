import { Injectable } from '@angular/core';
import { Certificate } from '../../../model/certificate.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private url = '/api/cer';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + "/findAll").pipe(catchError(this.handleException));
  }


  remove(id: number): Observable<{}> {
    return this.http.delete(this.url + '/remove/' + id, { responseType: 'text' as 'text' })
      .pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
  
}
