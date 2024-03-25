import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../types/program';
import { GlobalLoaderService } from 'src/app/core/global-loader.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  programsList: Program[] = [];

  constructor(private programService: ProgramService, private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.globalLoaderService.isLoading = true;

    this.programService.getPrograms().subscribe(data => {
      this.programsList = data.results;
      this.globalLoaderService.isLoading = false;
    })
  }
}
