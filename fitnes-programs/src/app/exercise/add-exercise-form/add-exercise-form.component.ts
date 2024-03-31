import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../types/exercise';
import { ExerciseService } from '../exercise.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { disableAndHideLoader, initForm, resetForm } from '../utils/form.utils';

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

  form = this.fb.group({
    title: ['', Validators.required],
    sets: [0, Validators.required],
    repetitions: ['', Validators.required],
  });


  ngOnInit(): void {
    const { title, sets, repetitions } = this.exercise;
    initForm(this.form, title, sets, repetitions);
  }

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private fb: FormBuilder,
    private loaderService: LoaderService) { }

  get isLoading() {
    return this.loaderService.isLoading();
  }

  get userId() {
    return this.userService.userId
  }

  edit() {
    this.form.enable();
  }

  delete() {
    this.confirmAndDeleteExercise();
  }

  cancel() {
    const { title, sets, repetitions } = this.exercise;
    resetForm(this.form, title, sets, repetitions);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.loaderService.setLoadingState(true);

    const { title, sets, repetitions } = this.form.value;

    if (this.exercise.objectId) {
      this.updateExercise(title!, sets!, repetitions!, this.exercise.objectId);
    } else {
      this.createExercise(title!, sets!, repetitions!);
    }
  }

  private confirmAndDeleteExercise() {
    if (!confirm('Are you sure you want to delete this exercise ?')) {
      return;
    }

    if (this.exercise.objectId) {
      this.loaderService.setLoadingState(true);

      this.exerciseService.delete(this.exercise.objectId).subscribe((res) => {
        this.loaderService.setLoadingState(false);
        this.deleteExercise(this.index);
      });
    } else {
      this.deleteExercise(this.index);
    }
  }

  private updateExercise(title: string, sets: number, repetitions: string, exerciseId: string) {
    this.exerciseService.update(title, sets, repetitions, exerciseId, this.programId, this.userId!)
      .subscribe((res) => {
        disableAndHideLoader(this.form, this.loaderService);
      });
  }

  private createExercise(title: string, sets: number, repetitions: string) {
    this.exerciseService.create(title, sets, repetitions, this.programId, this.userId!)
      .subscribe((res) => {
        this.exercise.objectId = res.objectId;
        disableAndHideLoader(this.form, this.loaderService);
      });
  }
}