import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../types/program';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit, OnDestroy {
  programSubscription: Subscription;
  programs: Program[] = [];
  limit = 1;
  skip = 0;
  isFinished = false;

  constructor(private programService: ProgramService, private globalLoaderService: GlobalLoaderService) {
    this.programSubscription = programService.programs$.subscribe(data => this.programs = [...this.programs, ...data]);
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  scrolled() {
    if (this.isFinished) {
      return
    }

    this.getPrograms();
  }

  getPrograms() {
    this.globalLoaderService.setLoadingState(true);
    this.programService.getPrograms(this.limit, this.skip).subscribe((res) => {
      this.skip++;

      if (res.results.length == 0) {
        this.isFinished = true;
      }

      this.globalLoaderService.setLoadingState(false);
    })
  }

  ngOnDestroy(): void {
    this.programSubscription.unsubscribe();
  }
}