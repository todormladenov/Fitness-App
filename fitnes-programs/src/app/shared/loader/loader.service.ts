import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoadingState(loadingState: boolean): void {
    this.isLoading$$.next(loadingState);
  }

  isLoading(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }
}
