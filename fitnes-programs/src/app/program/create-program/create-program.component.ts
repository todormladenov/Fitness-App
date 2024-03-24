import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ProgramService } from '../program.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent {

  constructor(private userService: UserService, private programService: ProgramService, private router: Router) { }

  create(form: NgForm) {
    const { title, type, image, price, description } = form.value;
    const ownerId = this.userService.userId;
    
    this.programService.createProgram(title, type, image, price, description, ownerId!).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
