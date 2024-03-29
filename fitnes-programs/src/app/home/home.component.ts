import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program/program.service';
import { Program } from '../program/types/program';
import { GlobalLoaderService } from '../core/global-loader/global-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  program = {} as Program;

  constructor(private programService: ProgramService, private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.getMostRecent();
  }

  get isLoading(){
    return this.globalLoaderService.isLoading
  }

  getMostRecent() {
    this.globalLoaderService.showLoader();
    this.programService.getNewestProgram().subscribe((data) => {
      this.program = data.results[0];
      this.globalLoaderService.hideLoader();
    });
  }
}
