import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

   private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();

  constructor(private http: HttpClient) {}

  agregarProducto(email: string, producto: any): Observable<any> {
    return this.http.post(`${environment.api_url}/carrito/agregar`, { email, producto });
  }

  obtenerCarrito(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/carrito/${email}`);
  }

  actualizarCantidadProducto(email: string): void {
    this.obtenerCarrito(email).subscribe({
      next: (carrito) => {
        const total = carrito.reduce((acc: number, item: any) => acc + item.cantidad, 0);
        this.cantidadSubject.next(total);
      },
      error: () => this.cantidadSubject.next(0)
    });
  }

  actualizarCantidad(email: string, productoId: number, cantidad: number): Observable<any> {
    return this.http.put(`${environment.api_url}/carrito/cantidad`, { email, productoId, cantidad });
  }

  eliminarProducto(email: string, productoId: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/carrito/${email}/${productoId}`);
  }
}
