import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuth } from './types/user';
import { tap } from 'rxjs';
import { removeItem, setItem } from './utils/storage-management';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserForAuth | undefined;

  get isLoggedIn() {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  registerUser(email: string, username: string, password: string) {
    return this.http
      .post<UserForAuth>('api/users', { email, username, password })
      .pipe(tap((user) => {
        setItem('AuthToken', user?.sessionToken);
      }));
  }

  loginUser(username: string, password: string) {
    return this.http
      .post<UserForAuth>('api/login', { username, password })
      .pipe(tap((user) => {
        setItem('AuthToken', user?.sessionToken);
        this.user = user;
      }))
  }

  logoutUser() {
    return this.http
      .post('api/logout', {})
      .pipe(tap(() => {
        removeItem('AuthToken');
        this.user = undefined;
      }))
  }

  getCurrentUser() {
    return this.http
      .get('api/users/me')
      
  }
}
