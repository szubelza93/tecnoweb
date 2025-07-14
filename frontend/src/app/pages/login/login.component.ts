import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {
  loginForm = this.fb.group({
    identifier: ['', [Validators.required]],
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
    console.log('==> Hola vista login ');

  }

  onClickLogin() {
    if (this.loginForm.invalid) return;

    console.log('Iniciando proceso de login...');
    this.isLoading = true;
    this.error = null;

    // Determinar si el identificador es un email o un nombre de usuario
    const identifier = this.loginForm.value.identifier || '';
    const isEmail = identifier.includes('@');
    console.log(`Tipo de identificador: ${isEmail ? 'Email' : 'Nombre de usuario'}`);

    // Adaptar los nombres de campos para que coincidan con el backend
    const loginData = {
      [isEmail ? 'email' : 'username']: identifier,
      password: this.loginForm.value.password
    };

    console.log('Enviando solicitud de autenticación al servidor...');
    this.api.post<any>('/auth/login', loginData).subscribe({
      next: (resp) => {
        console.log('Respuesta del servidor recibida:', resp.success ? 'Exitosa' : 'Fallida');

        if (resp.success && resp.data?.accessToken) {
          console.log('Autenticación exitosa, guardando datos de sesión...');

          // Usar AuthService para guardar los datos de autenticación
          this.authService.setToken(resp.data.accessToken);
          this.authService.setRefreshToken(resp.data.refreshToken);

          // Guardar datos del usuario
          if (resp.data.user) {
            console.log('Guardando información del usuario...');
            this.authService.setUserData(resp.data.user);
          }

          console.log('Redirigiendo al dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Error en la respuesta del servidor:', resp.message);
          this.error = resp.message || 'Error desconocido';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error durante la autenticación:', err?.error?.message || 'Error desconocido');
        this.error = err?.error?.message || 'Correo electrónico, nombre de usuario o contraseña incorrectos';
        this.isLoading = false;
      },
    });


  }

  // Método para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
