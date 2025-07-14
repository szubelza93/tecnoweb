import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userData: any = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userData = this.authService.getUserData();
  }

  logout(): void {
    this.apiService.logout().subscribe({
      next: () => {
        // Navigation is handled in the ApiService
      },
      error: (err) => {
        console.error('Error during logout:', err);
        // Even if the server request fails, we should still clear local data and redirect
        this.apiService.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }

  // Get full image URL using the ApiService
  getFullImageUrl(relativePath: string | null): string {
    return this.apiService.getFullImageUrl(relativePath);
  }
}
