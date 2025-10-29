import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: any;
  usersUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.usersUrl = this.baseUrl + '/users';
  }

  getUsers() {
    return this.http.get<any>(this.usersUrl);
  }

  addUser(payload: Partial<User>) {
    return this.http.post<any>(this.usersUrl, payload);
  }
}
