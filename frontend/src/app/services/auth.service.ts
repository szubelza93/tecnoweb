import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly refreshTokenKey = 'refreshToken';
  private readonly userDataKey = 'userData';

  constructor() { }

  // Obtiene el token JWT desde localStorage
  get token(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  // Guarda el token JWT en localStorage
  setToken(token: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.tokenKey, token);
  }

  // Guarda el refresh token en localStorage
  setRefreshToken(refreshToken: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Guarda los datos del usuario en localStorage
  setUserData(userData: any): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  // Verifica si el usuario está logueado y el token es válido (no expirado)
  isLoggedIn(): boolean {
    const token = this.token;
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Verifica expiración del token
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  // Obtiene los datos del usuario desde localStorage
  getUserData(): any {
    if (typeof localStorage === 'undefined') return null;
    const userData = localStorage.getItem(this.userDataKey);
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch (e) {
      return null;
    }
  }

  // Borra todos los datos de autenticación y desloguea al usuario
  logout(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userDataKey);
  }
}
