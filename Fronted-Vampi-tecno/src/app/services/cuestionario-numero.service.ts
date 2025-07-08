import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuestionarioNumero } from '../models/cuestionario-numero.interface';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

const API_BASE = 'http://localhost:3000/api/cuestionarios-numeros';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function mapFromBackend(d: any): CuestionarioNumero {
  return {
    vcueNroCue: d.vcuenrocue,
    vcueDescri: d.vcuedescri
  };
}

const EMPTY_CUESTIONARIO: CuestionarioNumero = { vcueNroCue: 0, vcueDescri: '' };

@Injectable({ providedIn: 'root' })
export class CuestionarioNumeroService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<CuestionarioNumero[]>> {
    return this.http.get<ApiResponse<any[]>>(API_BASE).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapFromBackend) : []
      }))
    );
  }

  getById(id: number): Observable<ApiResponse<CuestionarioNumero>> {
    return this.http.get<ApiResponse<any>>(`${API_BASE}/${id}`).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapFromBackend(response.data) : { ...EMPTY_CUESTIONARIO }
      }))
    );
  }

  create(cuestionario: CuestionarioNumero): Observable<ApiResponse<CuestionarioNumero>> {
    return this.http.post<ApiResponse<any>>(API_BASE, cuestionario).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapFromBackend(response.data) : { ...EMPTY_CUESTIONARIO }
      }))
    );
  }

  update(id: number, cuestionario: CuestionarioNumero): Observable<ApiResponse<CuestionarioNumero>> {
    return this.http.put<ApiResponse<any>>(`${API_BASE}/${id}`, cuestionario).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapFromBackend(response.data) : { ...EMPTY_CUESTIONARIO }
      }))
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${API_BASE}/${id}`);
  }

  searchByDescripcion(descripcion: string): Observable<ApiResponse<CuestionarioNumero[]>> {
    const params = new HttpParams().set('descripcion', descripcion);
    return this.http.get<ApiResponse<any[]>>(`${API_BASE}/search/descripcion`, { params }).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapFromBackend) : []
      }))
    );
  }
} 