import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service'
import { Router, RouterModule  } from '@angular/router'
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule], 
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categoriasSeleccionadas: Set<string> = new Set();


  marcasSeleccionadas: Set<string> = new Set();
  nombreBuscado: string = '';

  ordenSeleccionado: string = '';

  constructor(private http: HttpClient, private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/productos')
      .subscribe(data => {
        this.productos = data;
        this.productosFiltrados = data;
      });
  }

  filtrarPorCategoria(categoria: string, checked: boolean): void {
    if (checked) {
      this.categoriasSeleccionadas.add(categoria);
    } else {
      this.categoriasSeleccionadas.delete(categoria);
    }

    this.aplicarFiltros();
  }

  onCategoriaChange(event: Event, categoria: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filtrarPorCategoria(categoria, checked);
  }


  onMarcaChange(event: Event, marca: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.marcasSeleccionadas.add(marca.toLowerCase());
    } else {
      this.marcasSeleccionadas.delete(marca.toLowerCase());
    }
    this.aplicarFiltros();
  }

  // NUEVO:
  onBuscarNombre(): void {
    this.aplicarFiltros();
  }

  ordenarProductos(orden: string): void {
    this.ordenSeleccionado = orden;
    this.aplicarFiltros();
  }


  aplicarFiltros(): void {
    this.productosFiltrados = this.productos
      .filter(p =>
        (this.categoriasSeleccionadas.size === 0 || this.categoriasSeleccionadas.has(p.clasificacion.toLowerCase())) &&
        (this.marcasSeleccionadas.size === 0 || this.marcasSeleccionadas.has(p.marca?.toLowerCase())) &&
        (p.nombre.toLowerCase().includes(this.nombreBuscado.toLowerCase()))
      )
      .sort((a, b) => {
        if (this.ordenSeleccionado === 'menor') return a.precio - b.precio;
        if (this.ordenSeleccionado === 'mayor') return b.precio - a.precio;
        return 0;
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
