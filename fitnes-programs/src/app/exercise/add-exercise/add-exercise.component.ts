import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription | undefined;
  exerciseList: Exercise[] = [];
  programId: string = '';

  constructor(private exerciseServices: ExerciseService, private activatedRoute: ActivatedRoute) { }

  addExercise() {
    const newExercise: Exercise = {
      objectId: null,
      createdAt: null,
      updatedAt: null,
      title: null,
      sets: null,
      repetitions: null,
      program: null,
      owner: null
    }

    this.exerciseList = [...this.exerciseList, newExercise]
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.programId = data['programId'];
      this.loadExercise();
    });
  }

  loadExercise() {
    this.exerciseSubscription = this.exerciseServices.exercise$.subscribe((exercises) => {
      this.exerciseList = exercises;
      this.addExercise();
    })
    this.exerciseServices.getExerciseByProgramId(this.programId).subscribe();
  }

  deleteExercise = (index: number) => {
    this.exerciseList.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
  }
}
