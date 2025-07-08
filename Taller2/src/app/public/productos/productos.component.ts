import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categoriasSeleccionadas: Set<string> = new Set();
  ordenSeleccionado: string = '';

  constructor(private http: HttpClient, private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/productos')
      .subscribe(data => {
        this.productos = data;

        const categoriasGuardadas = JSON.parse(localStorage.getItem('categoriasSeleccionadas') || '[]');
        const ordenGuardado = localStorage.getItem('ordenSeleccionado') || '';

        this.categoriasSeleccionadas = new Set(categoriasGuardadas);

        if (this.categoriasSeleccionadas.size > 0) {
          this.productosFiltrados = this.productos.filter(p =>
            this.categoriasSeleccionadas.has(p.clasificacion.toLowerCase())
          );
        } else {
          this.productosFiltrados = this.productos;
        }

        if (ordenGuardado) {
          this.ordenSeleccionado = ordenGuardado;
          this.ordenarProductos(ordenGuardado, false);
        }
      });
  }

  onCategoriaChange(event: Event, categoria: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filtrarPorCategoria(categoria, checked);
  }

  filtrarPorCategoria(categoria: string, checked: boolean): void {
    if (checked) {
      this.categoriasSeleccionadas.add(categoria);
    } else {
      this.categoriasSeleccionadas.delete(categoria);
    }

    localStorage.setItem('categoriasSeleccionadas', JSON.stringify([...this.categoriasSeleccionadas]));

    if (this.categoriasSeleccionadas.size === 0) {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p =>
        this.categoriasSeleccionadas.has(p.clasificacion.toLowerCase())
      );
    }

    if (this.ordenSeleccionado) {
      this.ordenarProductos(this.ordenSeleccionado, false);
    }
  }

  ordenarProductos(orden: string, guardar: boolean = true): void {
    this.ordenSeleccionado = orden;

    if (guardar) {
      localStorage.setItem('ordenSeleccionado', orden);
    }

    this.productosFiltrados.sort((a, b) => {
      return orden === 'menor' ? a.precio - b.precio : b.precio - a.precio;
    });
  }

  agregarAlCarrito(producto: any): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (!usuario || !usuario.email) {
      this.router.navigate(['/usuarios/signin']);
      return;
    }

    this.carritoService.agregarProducto(usuario.email, producto).subscribe({
      next: res => alert(res.msg),
      error: () => alert('Error al agregar al carrito')
    });
  }
}
