import { Injectable } from '@angular/core';
import { Login } from 'src/app/model/user/login';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from 'src/app/model/user/register';
import { Options } from 'selenium-webdriver/safari';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<{}> {
    return this.http.post<{}>('/api/user/login', login, {responseType: 'text' as 'json'}).pipe(catchError(this.handleException));
  }

  register(register: Register): Observable<{}> {
    return this.http.post<{}>('api/user/register', register, {responseType: 'text' as 'json'}).pipe(catchError(this.handleException));
  }

  logout() {
  }

  isAuthenticated(): boolean {
    return true;
  }

  isSecurityAdmin() {
    return true;
  }

  isBackupAdmin(): boolean {
    return true;
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.message);
  }
}
