import { Component, Input } from '@angular/core';
import { Exercise } from '../types/exercise';

@Component({
  selector: 'app-add-exercise-form',
  templateUrl: './add-exercise-form.component.html',
  styleUrls: ['./add-exercise-form.component.css']
})
export class AddExerciseFormComponent {
  @Input('exercise') exercise = {} as Exercise;
}
