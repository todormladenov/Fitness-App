import { Component, Input } from '@angular/core';
import { Program } from '../types/program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})

export class ProgramComponent {
  @Input('program') program: Program | undefined;
}
