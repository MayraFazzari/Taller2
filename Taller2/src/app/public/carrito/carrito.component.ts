import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarritoService } from '../../services/carrito.service'

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = []
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: productos => this.carrito = productos,
      error: () => alert('Debes iniciar sesión para ver el carrito')
    });
  }

  getTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  cambiarCantidad(item: any, cambio: number): void {
    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad <= 0) {
      this.eliminarItem(item);
      return;
    }

    this.carritoService.actualizarCantidad(item.id, nuevaCantidad).subscribe({
      next: () => {
        this.carritoService.actualizarCantidadProducto();
        item.cantidad = nuevaCantidad;
      },
      error: () => alert('Error al actualizar cantidad')
    });
  }

  eliminarItem(item: any): void {
    this.carritoService.eliminarProducto(item.id).subscribe({
      next: () => {
        this.carritoService.actualizarCantidadProducto();
        this.carrito = this.carrito.filter(p => p.id !== item.id);
      },
      error: () => alert('Error al eliminar el producto')
    });
  }
}
