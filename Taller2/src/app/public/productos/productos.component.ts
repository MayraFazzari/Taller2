import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs';
import { CardProductoComponent } from '../card-producto/card-producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,CardProductoComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  productosFiltrados: any[] = [];

  private subscription: Subscription = new Subscription();
  cantidades: { [id: number]: number } = {};

  private productosService = inject(ProductosService);
  private carritoService = inject(CarritoService);
  private imageService = inject(ImageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productosService.cargarProductos();

    this.subscription = this.productosService.productosFiltrados$.subscribe(productos => {
      this.productosFiltrados = productos;
    });
  }

  get nombreBuscado(): string {
    return this.productosService.nombreBuscado;
  }

  get ordenSeleccionado(): string {
    return this.productosService.ordenSeleccionado;
  }

  get categoriasSeleccionadas(): Set<string> {
    return this.productosService.categoriasSeleccionadas;
  }

  get marcasSeleccionadas(): Set<string> {
    return this.productosService.marcasSeleccionadas;
  }

  getImagen(item: any): string {
    return this.imageService.obtenerUrlImagen(item.imagen);
  }

  set nombreBuscado(value: string) {
    this.productosService.actualizarBusqueda(value);
  }

  onCategoriaChange(event: Event, categoria: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.productosService.actualizarCategoria(categoria, checked);
  }

  onMarcaChange(event: Event, marca: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.productosService.actualizarMarca(marca, checked);
  }

  set ordenSeleccionado(value: string) {
    this.productosService.ordenSeleccionado = value;
  }

  ordenarProductos(orden: string): void {
    this.ordenSeleccionado = orden;
    this.productosService.actualizarOrden(orden);
  }


  getCantidad(productoId: number): number {
    return this.cantidades[productoId] ?? 1;
  }

  sumarCantidad(productoId: number): void {
    this.cantidades[productoId] = this.getCantidad(productoId) + 1;
  }

  restarCantidad(productoId: number): void {
    const actual = this.getCantidad(productoId);
    if (actual > 1) {
      this.cantidades[productoId] = actual - 1;
    }
  }

  limpiarFiltros(): void {
  this.productosService.limpiarFiltros();
  this.productosService.nombreBuscado = '';
  this.productosService.categoriasSeleccionadas.clear();
  this.productosService.marcasSeleccionadas.clear();
  this.productosService.ordenSeleccionado = '';
  this.productosService.aplicarFiltros();
}

 agregarAlCarrito(producto: any): void {
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (!usuario || !usuario.email) {
    this.router.navigate(['/usuarios/signin']);
    return;
  }
  const cantidad = this.getCantidad(producto.id);
  const productoConCantidad = { ...producto, cantidad };
  this.carritoService.agregarProducto(productoConCantidad).subscribe({
    next: () => {
      this.carritoService.actualizarCantidadProducto();
    },
    error: () => alert('Error al agregar al carrito')
  });
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
