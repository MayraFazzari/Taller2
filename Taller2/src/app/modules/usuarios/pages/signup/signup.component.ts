import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupService} from '../../../../services/signup.service';

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
    private router: Router,
    private signupService: SignupService
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

    this.signupService.registrarUsuario(datos).subscribe({
      next: () => {
        this.mensaje = 'Registro exitoso';
        this.mensajeTipo = 'exito';

        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
          this.router.navigate(['/usuarios/signin']);
        }, 1500);
      },
      error: (err: { error: { msg: string; }; }) => {
        this.mensaje = err.error?.msg || 'Error al registrarse';
        this.mensajeTipo = 'error';

        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
        }, 3000);
      }
    });
  }
}
