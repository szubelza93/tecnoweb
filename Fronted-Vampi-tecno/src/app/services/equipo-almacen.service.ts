import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipoAlmacen } from '../models/equipo-almacen.interface';

const API_BASE = 'http://localhost:3000/api/equipos-almacen';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class EquipoAlmacenService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<EquipoAlmacen[]>> {
    return this.http.get<ApiResponse<EquipoAlmacen[]>>(API_BASE);
  }

  getById(id: number): Observable<ApiResponse<EquipoAlmacen>> {
    return this.http.get<ApiResponse<EquipoAlmacen>>(`${API_BASE}/${id}`);
  }

  create(equipo: EquipoAlmacen): Observable<ApiResponse<EquipoAlmacen>> {
    return this.http.post<ApiResponse<EquipoAlmacen>>(API_BASE, equipo);
  }

  update(id: number, equipo: EquipoAlmacen): Observable<ApiResponse<EquipoAlmacen>> {
    return this.http.put<ApiResponse<EquipoAlmacen>>(`${API_BASE}/${id}`, equipo);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${API_BASE}/${id}`);
  }

  searchByDescripcion(descripcion: string): Observable<ApiResponse<EquipoAlmacen[]>> {
    const params = new HttpParams().set('descripcion', descripcion);
    return this.http.get<ApiResponse<EquipoAlmacen[]>>(`${API_BASE}/search/descripcion`, { params });
  }

  getAlmacenesByEquipo(id: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${API_BASE}/${id}/almacenes`);
  }
} 