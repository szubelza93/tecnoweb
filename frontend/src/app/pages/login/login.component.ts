import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {
  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  isLoading = false;
  error: string | null = null;


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    console.log('==> Hoal vista login ');

  }

  onClickLogin() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.error = null;

    // Adaptar los nombres de campos para que coincidan con el backend
    const loginData = {
      email: this.loginForm.value.correo,
      password: this.loginForm.value.password
    };

    this.api.post<any>('/auth/login', loginData).subscribe({
      next: (resp) => {
        console.log('==> Respuesta del login: ', resp);

        if (resp.success && resp.data?.accessToken) {
          // Usar AuthService para guardar los datos de autenticación
          this.authService.setToken(resp.data.accessToken);
          this.authService.setRefreshToken(resp.data.refreshToken);

          // Guardar datos del usuario
          if (resp.data.user) {
            this.authService.setUserData(resp.data.user);
          }

          this.router.navigate(['/dashboard']);
        } else {
          this.error = resp.message || 'Error desconocido';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Correo o contraseña incorrectos';
        this.isLoading = false;
      },
    });


  }

  // Método para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
