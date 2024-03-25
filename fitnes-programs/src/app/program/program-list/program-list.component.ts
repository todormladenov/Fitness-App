import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../types/program';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  programsList: Program[] = [];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.programsList = data.results;      
    })
  }
}
