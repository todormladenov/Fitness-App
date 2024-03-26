import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../types/program';
import { GlobalLoaderService } from 'src/app/core/global-loader.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  program = {} as Program;
  isShown = false;

  constructor(
    private programService: ProgramService,
    private activeRoute: ActivatedRoute,
    private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.getProgram();
  }

  getProgram() {
    this.globalLoaderService.showLoader();
    this.activeRoute.params.subscribe((data) => {
      const programId = data['programId'];

      this.programService.getProgramById(programId).subscribe((data) => {
        this.program = data;
        this.globalLoaderService.hideLoader();
      });
    })
  }

  get isLoading() {
    return this.globalLoaderService.isLoading;
  }

  toggleList() {
    this.isShown = !this.isShown
  }
}
