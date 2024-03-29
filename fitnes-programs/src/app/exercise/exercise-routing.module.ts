import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerActivate } from '../guards/owner.activate';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';

const routes: Routes = [

    { path: ':programId/add-exercise', component: AddExerciseComponent, canActivate: [OwnerActivate] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExerciseRoutingModule { }
