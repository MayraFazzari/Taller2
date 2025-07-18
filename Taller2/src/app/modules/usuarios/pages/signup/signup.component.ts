import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formulario: FormGroup;
  mensaje: string = '';
  mensajeTipo: 'exito' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  registrarUsuario() {
    const datos = this.formulario.value;

    this.http.post('http://localhost:5000/api/register', datos).subscribe({
      next: (res: any) => {
        this.mensaje = 'Registro exitoso';
        this.mensajeTipo = 'exito';

        // Espera 1.5s y redirige
        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
          this.router.navigate(['/usuarios/signin']);
        }, 1500);
      },
      error: (err: any) => {
        this.mensaje = err.error?.msg || 'Error al registrarse';
        this.mensajeTipo = 'error';

        // Limpia mensaje después de 3s
        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
        }, 3000);
      }
    });
  }
}
