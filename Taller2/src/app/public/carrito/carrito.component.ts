import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarritoService } from '../../services/carrito.service'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = []
  email: string = ''

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

    if (!usuario || !usuario.email) {
      alert('Debes iniciar sesión para ver el carrito')
      return
    }

    this.email = usuario.email

    this.carritoService.obtenerCarrito(this.email).subscribe({
      next: productos => this.carrito = productos,
      error: () => alert('Error al cargar el carrito')
    })
  }

  getTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  }

  cambiarCantidad(item: any, cambio: number): void {
  const nuevaCantidad = item.cantidad + cambio;

  if (nuevaCantidad <= 0) {
    this.eliminarItem(item);
    return;
  }

  this.carritoService.actualizarCantidad(this.email, item.id, nuevaCantidad).subscribe({
    next: () => {
      item.cantidad = nuevaCantidad;
    },
    error: () => alert('Error al actualizar cantidad')
  });
}

eliminarItem(item: any): void {
  this.carritoService.eliminarProducto(this.email, item.id).subscribe({
    next: () => {
      this.carrito = this.carrito.filter(p => p.id !== item.id);
    },
    error: () => alert('Error al eliminar el producto')
  });
}
}
