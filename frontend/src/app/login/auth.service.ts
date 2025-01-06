import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Backend's base URL

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    console.log(username,password);
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login/`, loginData);
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-auth/`);
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!this.getUser(); // Returns true if user data exists
  }
}
