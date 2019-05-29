import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private username: string;
  private password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.username !== undefined && this.password !== undefined) {
      this.userService.login({'username': this.username, 'password': this.password}).subscribe(
        result => {
          console.log('Jeee ulogovao se');
        }
      );
    }
  }

}
