import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../types/program';
import { GlobalLoaderService } from 'src/app/core/global-loader.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  program = {} as Program;
  programId: string = '';
  isShown = false;
  isOwner = false;

  constructor(
    private programService: ProgramService,
    private activeRoute: ActivatedRoute,
    private globalLoaderService: GlobalLoaderService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProgram();
  }

  getProgram() {
    this.globalLoaderService.showLoader();
    this.activeRoute.params.subscribe((data) => {
      this.programId = data['programId'];

      this.programService.getProgramById(this.programId).subscribe((data) => {
        this.program = data;
        this.isOwner = this.userService.userId === data.owner.objectId;
        this.globalLoaderService.hideLoader();
      });
    })
  }

  delete() {
    this.programService.deleteProgram(this.programId).subscribe((res) => {
      this.router.navigate(['/programs']);
    });
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  get isLoading() {
    return this.globalLoaderService.isLoading;
  }

  toggleList() {
    this.isShown = !this.isShown
  }
}
