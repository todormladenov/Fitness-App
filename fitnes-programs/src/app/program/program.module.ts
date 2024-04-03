import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { DetailsComponent } from './details/details.component';
import { ProgramRoutingModule } from './program-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProgramComponent } from './program/program.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TypesDirective } from './directives/types.directive';


@NgModule({
  declarations: [
    CreateProgramComponent,
    ProgramListComponent,
    DetailsComponent,
    ProgramComponent,
    EditProgramComponent,
    TypesDirective
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  exports: [
    ProgramComponent
  ]
})
export class ProgramModule { }
