import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) 
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this.apiUrl}/register`, userData);
  }
}
