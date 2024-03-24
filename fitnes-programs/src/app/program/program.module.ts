import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { DetailsComponent } from './details/details.component';
import { ProgramRoutingModule } from './program-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateProgramComponent,
    ProgramListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule
  ]
})
export class ProgramModule { }
