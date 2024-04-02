import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then((m) => m.ExerciseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
