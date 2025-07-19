import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = environment.api_url;
  private http = inject(HttpClient);

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }
}
