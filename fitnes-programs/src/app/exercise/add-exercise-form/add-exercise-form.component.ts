import { Component, Input } from '@angular/core';
import { Exercise } from '../types/exercise';

@Component({
  selector: 'app-add-exercise-form',
  templateUrl: './add-exercise-form.component.html',
  styleUrls: ['./add-exercise-form.component.css']
})
export class AddExerciseFormComponent {
  @Input('exercise') exercise = {} as Exercise;
  @Input('deleteExercise') deleteExercise!: (index: number) => void;
  @Input('index') index!: number;

  isDisabled = true;

  edit() {
    this.isDisabled = false;
  }

  delete() {
    this.deleteExercise(this.index);
  }
}
