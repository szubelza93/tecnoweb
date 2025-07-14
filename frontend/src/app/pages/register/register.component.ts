import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      usernick: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    console.log('==> Vista registro inicializada');
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.success = null;

    // Preparar datos para enviar al backend
    const registerData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      usernick: this.registerForm.value.usernick,
      password: this.registerForm.value.password
    };

    this.api.post<any>('/auth/register', registerData).subscribe({
      next: (resp) => {
        console.log('==> Respuesta del registro: ', resp);

        if (resp.success) {
          this.success = 'Registro exitoso. Redirigiendo al inicio de sesión...';

          // Guardar tokens y datos de usuario si el backend los devuelve
          if (resp.data?.accessToken) {
            // Usar AuthService para guardar los datos de autenticación
            this.authService.setToken(resp.data.accessToken);
            this.authService.setRefreshToken(resp.data.refreshToken);

            if (resp.data.user) {
              this.authService.setUserData(resp.data.user);
            }

            // Redirigir al dashboard después de un registro exitoso
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1500);
          } else {
            // Si no hay tokens, redirigir al login después de un breve retraso
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          }
        } else {
          this.error = resp.message || 'Error desconocido en el registro';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al registrar usuario';
        this.isLoading = false;
      }
    });
  }

  // Método para navegar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
