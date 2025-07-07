import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.formulario = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  iniciarSesion() {
    const datos = this.formulario.value;

    this.http.post<any>('http://localhost:5000/api/login', datos).subscribe({
      next: (respuesta) => {
        this.authService.setUsuario(respuesta.usuario);
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        alert('Email o contraseña incorrectos');
        console.error(err);
      }
    });
  }
}

