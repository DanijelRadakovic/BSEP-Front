import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Certificate } from 'src/app/model/cert/certificate.model';
import { TrustStorage } from 'src/app/model/cert/trust-storage.model';


@Injectable({
  providedIn: 'root'
})
export class TrustService {

  // private url = 'https://localhost:8082/api/trust';
  private url = '/api/trust';

  constructor(private http: HttpClient) {
  }

  findTrustStorage(serialNumber: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/' + serialNumber).pipe(catchError(this.handleException));
  }

  updateStorage(request: TrustStorage): Observable<String> {
    return this.http.post(this.url, request, { responseType: 'text' }).pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
}
