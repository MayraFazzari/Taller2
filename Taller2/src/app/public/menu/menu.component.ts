import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  usuario: any = null;
  cantidadProductos: number = 0;

  private authService = inject(AuthService);
  private router = inject(Router);
  private carritoService = inject(CarritoService);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.authService.getUsuario().subscribe(u => {
      this.usuario = u;

      if (this.usuario?.email) {
        this.carritoService.actualizarCantidadProducto();
        this.carritoService.cantidad$.subscribe(cantidad => {
          this.cantidadProductos = cantidad;
        });
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.actualizarCantidadProducto();
    this.productosService.limpiarFiltros();
    this.router.navigate(['/']);
  }
}
