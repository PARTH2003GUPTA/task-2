import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiurl = 'http://localhost:8080/user/login';
  loginUser(username: string, password: string):Observable<string> {
    const user={username,password};
    return this.http.post<string>(this.apiurl,user);
  }
}
