import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  productosFiltrados: any[] = [];
  nombreBuscado: string = '';
  ordenSeleccionado: string = '';
  categoriasSeleccionadas: Set<string> = new Set();
  marcasSeleccionadas: Set<string> = new Set();

  private subscription: Subscription = new Subscription();

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productosService.cargarProductos();

    this.subscription = this.productosService.productosFiltrados$.subscribe(productos => {
      this.productosFiltrados = productos;
    });

    //  reflejar en la vista los valores actuales del servicio
    this.nombreBuscado = this.productosService.nombreBuscado;
    this.ordenSeleccionado = this.productosService.ordenSeleccionado;
    this.categoriasSeleccionadas = this.productosService.categoriasSeleccionadas;
    this.marcasSeleccionadas = this.productosService.marcasSeleccionadas;
  }

  onBuscarNombre(): void {
    this.productosService.actualizarBusqueda(this.nombreBuscado);
  }

  onCategoriaChange(event: Event, categoria: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.productosService.actualizarCategoria(categoria, checked);
  }

  onMarcaChange(event: Event, marca: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.productosService.actualizarMarca(marca, checked);
  }

  ordenarProductos(orden: string): void {
    this.ordenSeleccionado = orden;
    this.productosService.actualizarOrden(orden);
  }

  agregarAlCarrito(producto: any): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (!usuario || !usuario.email) {
      this.router.navigate(['/usuarios/signin']);
      return;
    }

    this.carritoService.agregarProducto(usuario.email, producto).subscribe({
      next: () => {
        this.carritoService.actualizarCantidadProducto(usuario.email);
      },
      error: () => alert('Error al agregar al carrito')
    });
  }

  ngOnDestroy(): void {
    this.productosService.limpiarFiltros();
    this.subscription.unsubscribe();
  }
  
}
