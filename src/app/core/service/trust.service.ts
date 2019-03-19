import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Certificate } from 'src/model/certificate.model';
import { TrustStorage } from 'src/model/trust-storage.model';


@Injectable({
  providedIn: 'root'
})
export class TrustService {

  private url = '/api/trust';

  constructor(private http: HttpClient) {
  }

  findTrustStorage(serialNumber: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.url + '/' + serialNumber).pipe(catchError(this.handleException));
  }

  updateStorage(request: TrustStorage): Observable<{}> {
    return this.http.post<{}>(this.url, request).pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
}
