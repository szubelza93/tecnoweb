import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ng-menu-dashboard';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Iniciando validación de autenticación...');
    // Check authentication state before rendering UI
    setTimeout(() => {
      console.log('Verificando estado de autenticación...');
      // Check if user is authenticated
      const isLoggedIn = this.authService.isLoggedIn();
      console.log('Resultado de validación:', isLoggedIn ? 'Autenticado' : 'No autenticado');

      if (isLoggedIn) {
        // User is authenticated, navigate to dashboard
        console.log('Redirigiendo al dashboard...');
        this.router.navigate(['/dashboard']);
      } else {
        // User is not authenticated, navigate to login
        console.log('Redirigiendo al login...');
        this.router.navigate(['/login']);
      }

      // Set loading to false after navigation is determined
      setTimeout(() => {
        console.log('Completando proceso de validación');
        this.isLoading = false;
      }, 500); // Increased delay to ensure navigation completes and validation screen is visible
    }, 800); // Increased delay to ensure authentication check completes and validation screen is visible
  }
}
