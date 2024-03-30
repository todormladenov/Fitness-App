import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';
import { ExerciseService } from '../exercise.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  programId: string = '';
  userId: string = '';

  isDisabled = true;

  constructor(
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.programId = data['programId'];
    });
  }

  edit() {
    this.isDisabled = false;
  }

  delete() {
    this.deleteExercise(this.index);
  }

  cancel() {
    this.isDisabled = true;
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.userService.userId) {
      this.userId = this.userService.userId;
    }

    const { title, sets, repetitions } = form.value;

    this.exerciseService.create(title, sets, repetitions, this.programId, this.userId).subscribe((res) => {
      this.exercise.objectId = res.objectId;
      this.isDisabled = true;
    });
  }
}
