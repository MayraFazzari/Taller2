import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<any>(this.getUsuarioDesdeStorage());
  private loginUrl = `${environment.api_url}/login`;

  private http = inject(HttpClient);

  getUsuario(): Observable<any> {
    return this.usuarioActual.asObservable();
  }

  login(datos: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, datos);
  }

  setUsuario(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.next(usuario);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
  }

  private getUsuarioDesdeStorage(): any {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}
