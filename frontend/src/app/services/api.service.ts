import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:3000/api';
  private serverUrl = 'http://127.0.0.1:3000';


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  private getToken(): string | null {
    return this.authService.token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
    });
  }


   // MÉTODO PARA DELETE
  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  // MÉTODO PARA EDITAR (PUT)
  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
    });
  }

  // MÉTODO PARA SUBIR ARCHIVOS
  uploadFile<T>(endpoint: string, file: File, fieldName: string = 'file'): Observable<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // MÉTODO PARA CERRAR SESIÓN
  logout(): Observable<any> {
    // Llamar al endpoint de logout en el backend
    return this.post<any>('/auth/logout', {}).pipe(
      tap(() => {
        // Limpiar datos de sesión del localStorage
        this.clearSession();

        // Redirigir al login
        this.router.navigate(['/login']);
      })
    );
  }

  // Método para limpiar todos los datos de sesión
  clearSession(): void {
    this.authService.logout();
  }

  // Método para obtener la URL completa de una imagen
  getFullImageUrl(relativePath: string | null): string {
    if (!relativePath) {
      return 'assets/logo.png'; // Imagen por defecto
    }

    // Si la ruta ya es una URL completa, devolverla tal cual
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    // Si la ruta es relativa, añadir la URL del servidor
    return `${this.serverUrl}${relativePath}`;
  }
}
