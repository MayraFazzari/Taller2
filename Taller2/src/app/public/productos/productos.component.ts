import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service'
import { Router, RouterModule  } from '@angular/router'

@Component({
  selector: 'app-productos',
  standalone: true, // <-- importante
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient, private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/productos')
      .subscribe(data => {
        this.productos = data;
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
