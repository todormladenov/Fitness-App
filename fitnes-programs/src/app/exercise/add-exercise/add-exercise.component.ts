import { Component, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  exerciseList: Exercise[] = [];
  programId: string = '';

  constructor(private exerciseServices: ExerciseService, private activatedRoute: ActivatedRoute) { }

  addExercise() {
    const newExercise: Exercise = {
      objectId: null,
      createdAt: '',
      updatedAt: '',
      title: '',
      sets: '',
      repetitions: '',
      program: null,
      owner: null
    }

    this.exerciseList = [...this.exerciseList, newExercise]
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.programId = data['programId'];
      this.loadExercise();
      this.addExercise();
    });
  }

  loadExercise() {
    this.exerciseServices.getExerciseByProgramId(this.programId).subscribe((data) => {
      this.exerciseList = data.results;
    })
  }

  deleteExercise = (index: number) => {
    this.exerciseList.splice(index, 1);
  }
}
