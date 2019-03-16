import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
