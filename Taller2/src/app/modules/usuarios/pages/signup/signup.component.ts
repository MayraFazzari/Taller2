import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: [''],
      password: [''],
      nombre: [''],
      apellido: [''],
      direccion: ['']
    });
  }

  registrarUsuario() {
    const datos = this.formulario.value;

    this.http.post('http://localhost:5000/api/register', datos).subscribe({
      next: (res: any) => {
        alert('Registro exitoso');
        this.router.navigate(['/usuarios/signin']);
      },
      error: (err: any) => {
        alert(err.error?.msg || 'Error al registrarse');
        console.error(err);
      }
    });
  }
}
