import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  setLoadingState(loadingState: boolean) {
    this.isLoading$$.next(loadingState);
  }

  isLoading() {
    return this.isLoading$$.asObservable();
  }
}
