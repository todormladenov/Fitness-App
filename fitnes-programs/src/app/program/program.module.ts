import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { DetailsComponent } from './details/details.component';
import { ProgramRoutingModule } from './program-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProgramComponent } from './program/program.component';



@NgModule({
  declarations: [
    CreateProgramComponent,
    ProgramListComponent,
    DetailsComponent,
    ProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ProgramModule { }
