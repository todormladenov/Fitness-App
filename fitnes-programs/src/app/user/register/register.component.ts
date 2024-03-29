import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router, private loaderService: LoaderService) { }

  get isLoading() {
    return this.loaderService.isLoading();
  }
  
  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loaderService.setLoadingState(true);

    const { email, username, password } = form.value

    this.userService.registerUser(email, username, password)
      .subscribe((user) => {
        this.loaderService.setLoadingState(false);
        this.router.navigate(['/user/login'])
      });
  }
}
