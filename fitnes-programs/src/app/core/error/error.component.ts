import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {
  errorMsg: string | null = null;
  errorSubscription: Subscription;
  isVisible = false;

  constructor(private errorService: ErrorService) {
    this.errorSubscription = this.errorService.error$.subscribe((error) => {
      this.errorMsg = error;
      setTimeout(() => this.errorMsg = null, 3000);
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

}
