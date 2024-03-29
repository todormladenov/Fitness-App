import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ProgramService } from '../program.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent {
  constructor(
    private userService: UserService,
    private programService: ProgramService,
    private router: Router,
    private loaderService: LoaderService) { }

  get isLoading() {
    return this.loaderService.isLoading();
  }

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, description, type, image, price } = form.value;
    const ownerId = this.userService.userId;

    this.loaderService.setLoadingState(true);

    this.programService.createProgram(title, description, type, image, price, ownerId!).subscribe(() => {
      this.loaderService.setLoadingState(false);
      this.router.navigate(['/home']);
    });
  }
}
