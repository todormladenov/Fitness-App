import { Component, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit{
  exerciseList: Exercise [] = [];

  addExercise() {
    this.exerciseList.push({
      objectId: null,
      createdAt: '',
      updatedAt: '',
      title: '',
      sets: '',
      repetitions: '',
      program: null,
      owner: null
    })
  }

  ngOnInit(): void {
    this.addExercise()
  }
}
