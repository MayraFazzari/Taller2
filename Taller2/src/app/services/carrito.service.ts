import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();
  private http = inject(HttpClient);

  private getEmail(): string | null {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    return usuario?.email ?? null;
  }

  obtenerCarrito(): Observable<any[]> {
    const email = this.getEmail();
    if (!email) return new BehaviorSubject<any[]>([]).asObservable();
    return this.http.get<any[]>(`${environment.api_url}/carrito/${email}`);
  }

  agregarProducto(producto: any): Observable<any> {
    const email = this.getEmail();
    return this.http.post(`${environment.api_url}/carrito/agregar`, { email, producto });
  }

  actualizarCantidadProducto(): void {
    this.obtenerCarrito().subscribe({
      next: (carrito) => {
        const total = carrito.reduce((acc: number, item: any) => acc + item.cantidad, 0);
        this.cantidadSubject.next(total);
      },
      error: () => this.cantidadSubject.next(0)
    });
  }

  actualizarCantidad(productoId: number, cantidad: number): Observable<any> {
    const email = this.getEmail();
    return this.http.put(`${environment.api_url}/carrito/cantidad`, { email, productoId, cantidad });
  }

  eliminarProducto(productoId: number): Observable<any> {
    const email = this.getEmail();
    return this.http.delete(`${environment.api_url}/carrito/${email}/${productoId}`);
  }
}
