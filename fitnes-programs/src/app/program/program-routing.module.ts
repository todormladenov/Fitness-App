import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { DetailsComponent } from './details/details.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
    {
        path: 'programs', children: [
            { path: '', pathMatch: 'full', component: ProgramListComponent },
            { path: ':programId', component: DetailsComponent },
            { path: ':programId/edit', component: EditProgramComponent }
        ]
    },
    { path: 'create-program', component: CreateProgramComponent, canActivate: [AuthActivate] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramRoutingModule { }
