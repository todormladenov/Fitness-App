import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../program/program.service';
import { Program } from '../program/types/program';
import { GlobalLoaderService } from '../core/global-loader/global-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  program: Program | undefined;
  programSubscription: Subscription | undefined;

  constructor(private programService: ProgramService, private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.loadMostRecentProgram();
  }

  loadMostRecentProgram() {
    this.globalLoaderService.setLoadingState(true);
    this.getMostRecentProgram();
  }

  private getMostRecentProgram() {
    this.programService.getNewestProgram()
      .subscribe(() => this.globalLoaderService.setLoadingState(false));

    this.programSubscription = this.programService.singleProgram$.subscribe((data) => {
      this.program = data;
    });
  }

  ngOnDestroy(): void {
    this.programService.clearSingleProgram();
    this.programSubscription?.unsubscribe();
  }
}
