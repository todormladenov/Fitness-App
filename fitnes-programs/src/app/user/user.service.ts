import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuth } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(email: string, username: string, password: string) {
    return this.http.post<UserForAuth>('api/users', { email, username, password });
  }

  loginUser(username: string, password: string) {
    return this.http.post<UserForAuth>('api/login', { username, password })
  }
}
