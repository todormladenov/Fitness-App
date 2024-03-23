import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from './types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { removeItem, setItem } from './utils/storage-management';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined)
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  userSubscription: Subscription

  get isLoggedIn() {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => this.user = user);
  }

  registerUser(email: string, username: string, password: string) {
    return this.http
      .post<UserForAuth>('api/users', { email, username, password });
  }

  loginUser(username: string, password: string) {
    return this.http
      .post<UserForAuth>('api/login', { username, password })
      .pipe(tap((user) => {
        setItem('AuthToken', user?.sessionToken);
        this.user$$.next(user);
      }))
  }

  logoutUser() {
    return this.http
      .post<UserForAuth>('api/logout', {})
      .pipe(tap(() => {
        removeItem('AuthToken');
        this.user$$.next(undefined);
      }))
  }

  getCurrentUser() {
    return this.http
      .get<UserForAuth>('api/users/me')
      .pipe(tap((user) => this.user$$.next(user)));

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
