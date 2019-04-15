import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  type: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    if (this.username !== undefined && this.password !== undefined && this.type !== undefined) {
      this.userService.register({'username': this.username, 'password': this.password, 'role': this.type}).subscribe(
        result => {
          this.router.navigate(['']);
        }
      );
    }
  }

}
