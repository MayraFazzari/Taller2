import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ProductosService } from '../../../../services/productos.service';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formulario: FormGroup;
  mensaje: string = '';
  mensajeTipo: 'exito' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private productosService: ProductosService
  ) {
    this.formulario = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    const datos = this.formulario.value;
    this.productosService.limpiarFiltros();

    this.authService.login(datos).subscribe({
    next: (respuesta) => {
      this.authService.setUsuario(respuesta.usuario);
      this.router.navigate(['/productos']);
    },
    error: (err) => {
    this.mensaje = 'Email o contraseña incorrectos';
    this.mensajeTipo = 'error';

    setTimeout(() => {
      this.mensaje = '';
      this.mensajeTipo = '';
    }, 3000);
  }
  });
  }
}
