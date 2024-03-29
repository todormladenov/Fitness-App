import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {
  errorMsg: string | null = null;
  errorSubscription: Subscription;
  isVisible = false;

  constructor(private errorService: ErrorService, private loaderService: LoaderService) {

    this.errorSubscription = this.errorService.error$.subscribe((error) => {
      this.handleError(error);
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  private handleError(error: any) {
    this.errorMsg = error;
    this.loaderService.setLoadingState(false);
    setTimeout(() => this.errorMsg = null, 3000);
  }

}
