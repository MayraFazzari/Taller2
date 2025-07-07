import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<any>(this.getUsuarioDesdeStorage());

  constructor() {}

  private getUsuarioDesdeStorage() {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  getUsuario() {
    return this.usuarioActual.asObservable();
  }

  setUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.next(usuario);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
  }
}

