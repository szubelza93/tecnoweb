import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VamGrupSan, ApiResponse } from '../models/vamGrupSan.interface';
import { API_CONFIG, buildApiUrl } from '../config/api.config';
import { map } from 'rxjs/operators';

// Función de mapeo explícita para VamGrupSan
function mapVamGrupSanFromBackend(v: any): VamGrupSan {
  return {
    vqrsCodGrs: v.vqrscodgrs,
    vqrsGruABO: v.vqrsgruabo,
    vqrsTipoRH: v.vqrstiporh,
    vprgCodPrg: v.vprgcodprg,
    vprgEstMin: Number(v.vprgestmin),
    vprgEstMax: Number(v.vprgestmax),
    created_at: v.created_at,
    updated_at: v.updated_at
  };
}

@Injectable({
  providedIn: 'root'
})
export class VamGrupSanService {
  private baseUrl = buildApiUrl(API_CONFIG.VAMGRUPSAN.BASE);

  constructor(private http: HttpClient) { }

  // Operaciones CRUD principales
  getAllVamGrupSan(): Observable<ApiResponse<VamGrupSan[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl).pipe(
      map(response => {
        console.log('Respuesta del backend:', response);
        const mappedData = Array.isArray(response.data) ? response.data.map(v => {
          console.log('Dato original:', v);
          const mapped = mapVamGrupSanFromBackend(v);
          console.log('Dato mapeado:', mapped);
          return mapped;
        }) : [];
        console.log('Datos finales:', mappedData);
        return {
          ...response,
          data: mappedData
        };
      })
    );
  }

  getVamGrupSanById(id: string): Observable<ApiResponse<VamGrupSan>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamGrupSanFromBackend(response.data) : {} as VamGrupSan
      }))
    );
  }

  createVamGrupSan(vamGrupSan: VamGrupSan): Observable<ApiResponse<VamGrupSan>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl, vamGrupSan).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamGrupSanFromBackend(response.data) : {} as VamGrupSan
      }))
    );
  }

  updateVamGrupSan(id: string, vamGrupSan: VamGrupSan): Observable<ApiResponse<VamGrupSan>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, vamGrupSan).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamGrupSanFromBackend(response.data) : {} as VamGrupSan
      }))
    );
  }

  deleteVamGrupSan(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  searchVamGrupSanByGruABO(gruABO: string): Observable<ApiResponse<VamGrupSan[]>> {
    const params = new HttpParams().set('grupoABO', gruABO);
    return this.http.get<ApiResponse<any[]>>(buildApiUrl(API_CONFIG.VAMGRUPSAN.SEARCH), { params }).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapVamGrupSanFromBackend) : []
      }))
    );
  }
} 