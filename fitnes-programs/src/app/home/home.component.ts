import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program/program.service';
import { Program } from '../program/types/program';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  program = {} as Program;

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getMostRecent();
  }

  getMostRecent() {
    this.programService.getNewestProgram().subscribe((data) => {
      this.program = data.results[0];
    });
  }
}
