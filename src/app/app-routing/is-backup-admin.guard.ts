import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../core/service/user.service';


@Injectable()
export class IsBackupAdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated() && this.userService.isBackupAdmin()) {
      return true;
    }

    this.router.navigateByUrl('home');
    return false;
  }
}