import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../types/program';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';
import { UserService } from 'src/app/user/user.service';
import { ExerciseService } from 'src/app/exercise/exercise.service';
import { Exercise } from 'src/app/exercise/types/exercise';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription | undefined;
  programSubscription: Subscription | undefined;

  program: Program | undefined;
  exerciseList: Exercise[] = [];

  programId: string = '';
  isShown = false;
  isOwner = false;

  constructor(
    private programService: ProgramService,
    private exerciseService: ExerciseService,
    private activeRoute: ActivatedRoute,
    private globalLoaderService: GlobalLoaderService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProgramWithExercise();
  }

  loadProgramWithExercise() {
    this.globalLoaderService.showLoader();

    this.activeRoute.params.subscribe((data) => {
      this.programId = data['programId'];

      this.getProgram();
      this.getExercise();

      this.globalLoaderService.hideLoader();
    })
  }

  delete() {
    this.programService.deleteProgram(this.programId).subscribe((res) => {
      this.router.navigate(['/programs']);
    });
  }

  private getProgram() {
    this.programSubscription = this.programService.singleProgram$.subscribe((data) => {
      this.program = data;
      this.isOwner = this.userService.userId === data?.owner.objectId;
    });

    this.programService.getProgramById(this.programId).subscribe();
  }

  private getExercise() {
    this.exerciseSubscription = this.exerciseService.exercise$.subscribe((exercise) => {
      this.exerciseList = exercise
    });

    this.exerciseService.getExerciseByProgramId(this.programId).subscribe()
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

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
    this.programSubscription?.unsubscribe();
  }
}
