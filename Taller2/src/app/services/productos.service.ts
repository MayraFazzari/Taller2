import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:5000/productos'
  private productos: any[] = [];
  private productosFiltradosSubject = new BehaviorSubject<any[]>([]);
  productosFiltrados$ = this.productosFiltradosSubject.asObservable();

  nombreBuscado: string = '';
  categoriasSeleccionadas: Set<string> = new Set();
  marcasSeleccionadas: Set<string> = new Set();
  ordenSeleccionado: string = '';

  constructor(private http: HttpClient) {}

  // productos desde el back
  cargarProductos() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.productos = data;
      this.recuperarFiltros();
      this.aplicarFiltros();
    });
  }

  //  Guardar y cargar filtros desde localStorage
  private recuperarFiltros() {
    const categoriasGuardadas = JSON.parse(localStorage.getItem('categoriasSeleccionadas') || '[]');
    const marcasGuardadas = JSON.parse(localStorage.getItem('marcasSeleccionadas') || '[]');
    this.nombreBuscado = localStorage.getItem('nombreBuscado') || '';
    this.ordenSeleccionado = localStorage.getItem('ordenSeleccionado') || '';

    this.categoriasSeleccionadas = new Set(categoriasGuardadas);
    this.marcasSeleccionadas = new Set(marcasGuardadas.map((m: string) => m.toLowerCase()));
  }

 
  aplicarFiltros() {
    let filtrados = this.productos
      .filter(p => {
        const clasificacion = (p.clasificacion || '').toLowerCase();
        const marca = (p.marca || '').toLowerCase();
        const nombre = (p.nombre || '').toLowerCase();

        const coincideCategoria = this.categoriasSeleccionadas.size === 0 || this.categoriasSeleccionadas.has(clasificacion);
        const coincideMarca = this.marcasSeleccionadas.size === 0 || this.marcasSeleccionadas.has(marca);
        const coincideNombre = nombre.includes(this.nombreBuscado.toLowerCase());

        return coincideCategoria && coincideMarca && coincideNombre;
      })
      .sort((a, b) => {
        if (this.ordenSeleccionado === 'menor') return a.precio - b.precio;
        if (this.ordenSeleccionado === 'mayor') return b.precio - a.precio;
        return 0;
      });

    this.productosFiltradosSubject.next(filtrados);
  }

  
  actualizarBusqueda(nombre: string) {
    this.nombreBuscado = nombre;
    localStorage.setItem('nombreBuscado', nombre);
    this.aplicarFiltros();
  }

  actualizarCategoria(categoria: string, checked: boolean) {
    checked ? this.categoriasSeleccionadas.add(categoria) : this.categoriasSeleccionadas.delete(categoria);
    localStorage.setItem('categoriasSeleccionadas', JSON.stringify([...this.categoriasSeleccionadas]));
    this.aplicarFiltros();
  }

  actualizarMarca(marca: string, checked: boolean) {
    const m = marca.toLowerCase();
    checked ? this.marcasSeleccionadas.add(m) : this.marcasSeleccionadas.delete(m);
    localStorage.setItem('marcasSeleccionadas', JSON.stringify([...this.marcasSeleccionadas]));
    this.aplicarFiltros();
  }

  actualizarOrden(orden: string) {
    this.ordenSeleccionado = orden;
    localStorage.setItem('ordenSeleccionado', orden);
    this.aplicarFiltros();
  }


  limpiarFiltros() {
    localStorage.removeItem('categoriasSeleccionadas');
    localStorage.removeItem('marcasSeleccionadas');
    localStorage.removeItem('nombreBuscado');
    localStorage.removeItem('ordenSeleccionado');
  }
}
