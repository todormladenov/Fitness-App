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

  programId: string | null = '';
  isShown = false;
  isOwner = false;
  isSubscribed: boolean | undefined;

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
    this.globalLoaderService.setLoadingState(true);
    this.programId = this.activeRoute.snapshot.paramMap.get('programId');

    this.getProgram();
    this.getExercise();
  }

  delete() {
    this.programService.deleteProgram(this.programId!).subscribe((res) => {
      this.router.navigate(['/programs']);
    });
  }

  subscribe() {
    const subscriberId = this.userService.userId;

    if (!subscriberId) {
      return this.router.navigate(['/user/login']);
    }

    if (!this.program) {
      return this.router.navigate(['/programs']);
    }

    if (!this.program.subscribers) {
      this.program.subscribers = [];
    }

    if (this.program.subscribers.includes(subscriberId)) {
      return;
    }

    let subscribers = [...this.program.subscribers, subscriberId];

    return this.programService.subscribeToProgram(this.program.objectId, subscribers).subscribe(() => {
      this.isSubscribed = true;
      this.program!.subscribers = subscribers;
    })
  }

  private getProgram() {
    this.programService.getProgramById(this.programId!).subscribe();

    this.programSubscription = this.programService.singleProgram$.subscribe((data) => {
      this.program = data;
      this.isOwner = this.userService.userId === data?.owner.objectId;
      this.isSubscribed = this.program?.subscribers?.some((subscriberId) => subscriberId === this.userService.userId);
    });
  }

  private getExercise() {
    this.exerciseService.getExerciseByProgramId(this.programId!)
      .subscribe(() => this.globalLoaderService.setLoadingState(false));

    this.exerciseSubscription = this.exerciseService.exercise$.subscribe((exercise) => {
      this.exerciseList = exercise;      
    });
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  toggleList() {
    this.isShown = !this.isShown
  }

  ngOnDestroy(): void {
    this.programService.clearSingleProgram();
    this.exerciseSubscription?.unsubscribe();
    this.programSubscription?.unsubscribe();
  }
}