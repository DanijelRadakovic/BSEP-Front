import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('welcome');
  }

}
