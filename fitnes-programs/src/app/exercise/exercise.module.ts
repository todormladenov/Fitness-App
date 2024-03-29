import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { ExerciseRoutingModule } from './exercise-routing.module';



@NgModule({
  declarations: [
    AddExerciseComponent
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
