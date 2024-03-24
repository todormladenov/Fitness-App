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
  isLoading = false
  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.isLoading = true;

    const { username, password } = form.value
    this.userService.loginUser(username, password).subscribe((user) => {
      this.isLoading = false
      this.router.navigate(['/home'])
    });
  }
}
