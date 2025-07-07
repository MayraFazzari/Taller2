import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:5000/api'

  constructor(private http: HttpClient) {}

  agregarProducto(email: string, producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito/agregar`, { email, producto })
  }

  obtenerCarrito(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carrito/${email}`)
  }

  actualizarCantidad(email: string, productoId: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/carrito/cantidad`, {email, productoId, cantidad});
  }

  eliminarProducto(email: string, productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${email}/${productoId}`);
  }
}
