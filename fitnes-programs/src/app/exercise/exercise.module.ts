import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { AddExerciseFormComponent } from './add-exercise-form/add-exercise-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddExerciseComponent,
    AddExerciseFormComponent
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    FormsModule
  ]
})
export class ExerciseModule { }
