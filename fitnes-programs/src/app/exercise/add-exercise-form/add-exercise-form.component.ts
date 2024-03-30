import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';
import { ExerciseService } from '../exercise.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-exercise-form',
  templateUrl: './add-exercise-form.component.html',
  styleUrls: ['./add-exercise-form.component.css']
})
export class AddExerciseFormComponent implements OnInit {
  @Input('exercise') exercise = {} as Exercise;
  @Input('deleteExercise') deleteExercise!: (index: number) => void;
  @Input('index') index!: number;
  @Input('programId') programId: string = '';
  userId: string = '';

  form = this.fb.group({
    title: ['', Validators.required],
    sets: [0, Validators.required],
    repetitions: ['', Validators.required],
  });


  ngOnInit(): void {
    const { title, sets, repetitions } = this.exercise;

    this.form.setValue({
      title,
      sets,
      repetitions
    });

    this.form.disable();
  }

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private fb: FormBuilder) { }

  edit() {
    this.form.enable();
  }

  delete() {
    if (!confirm('Are you sure you want to delete this exercise ?')) {
      return;
    }

    if (this.exercise.objectId) {
      this.exerciseService.delete(this.exercise.objectId).subscribe((res) => {
        console.log(res);
      });
    }

    this.deleteExercise(this.index);
  }

  cancel() {
    this.form.reset({
      title: this.exercise.title,
      sets: this.exercise.sets,
      repetitions: this.exercise.repetitions
    });

    this.form.disable();
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.userService.userId) {
      this.userId = this.userService.userId;
    }

    const { title, sets, repetitions } = this.form.value;

    if (this.exercise.objectId) {
      this.exerciseService.update(title!, sets!, repetitions!, this.exercise.objectId, this.programId, this.userId)
        .subscribe((res) => {
          this.form.disable();
        });
    } else {
      this.exerciseService.create(title!, sets!, repetitions!, this.programId, this.userId)
        .subscribe((res) => {
          this.exercise.objectId = res.objectId;
          this.form.disable();
        });
    }
  }
}
