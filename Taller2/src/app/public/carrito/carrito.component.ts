import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CarritoService } from '../../services/carrito.service'
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = []
  private carritoService = inject(CarritoService);
  private imageService = inject(ImageService);

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: productos => this.carrito = productos,
      error: () => alert('Debes iniciar sesión para ver el carrito')
    });
  }

  getImagen(item: any): string {
    return this.imageService.obtenerUrlImagen(item.imagen);
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
