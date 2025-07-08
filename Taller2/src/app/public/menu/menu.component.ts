import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

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

  constructor(private authService: AuthService, private router: Router, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.authService.getUsuario().subscribe(u => {
      this.usuario = u;

      if (this.usuario?.email) {
        this.carritoService.actualizarCantidadProducto(this.usuario.email);
        this.carritoService.cantidad$.subscribe(cantidad => {
          this.cantidadProductos = cantidad;
        });
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.actualizarCantidadProducto('');
    this.router.navigate(['/']);
  }
}
