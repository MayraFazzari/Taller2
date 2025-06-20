import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.authService.register(form.value).subscribe({
      next: res => {
        alert(res.msg);
        form.reset();
      },
      error: err => {
        alert('Error al registrarse');
      }
    });
  }
}
