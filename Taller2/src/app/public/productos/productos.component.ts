import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categoriasSeleccionadas: Set<string> = new Set();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/productos')
      .subscribe(data => {
        this.productos = data;
        this.productosFiltrados = data;  // Mostrar todos al inicio
      });
  }

  filtrarPorCategoria(categoria: string, checked: boolean): void {
    if (checked) {
      this.categoriasSeleccionadas.add(categoria);
    } else {
      this.categoriasSeleccionadas.delete(categoria);
    }

    if (this.categoriasSeleccionadas.size === 0) {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p =>
        this.categoriasSeleccionadas.has(p.clasificacion.toLowerCase())
      );
    }
  }

  onCategoriaChange(event: Event, categoria: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filtrarPorCategoria(categoria, checked);
  }

  ordenSeleccionado: string = '';

  ordenarProductos(orden: string): void {
  this.ordenSeleccionado = orden;

  this.productosFiltrados.sort((a, b) => {
    if (orden === 'menor') {
      return a.precio - b.precio;
    } else if (orden === 'mayor') {
      return b.precio - a.precio;
    }
    return 0;
  });
}

}


