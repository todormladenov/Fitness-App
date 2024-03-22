import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, username, password } = form.value

    this.userService.registerUser(email, username, password)
      .subscribe((user) => {
        console.log(user);
        this.router.navigate(['/home'])
      });
  }
}
