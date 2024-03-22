import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      return
    }

    const { username, password } = form.value
    this.userService.loginUser(username, password).subscribe((user) => {
      this.router.navigate(['/home'])
    });
  }
}
