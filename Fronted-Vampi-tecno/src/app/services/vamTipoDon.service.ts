import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VamTipoDon, ApiResponse } from '../models/vamTipoDon.interface';
import { API_CONFIG, buildApiUrl } from '../config/api.config';
import { map } from 'rxjs/operators';

function mapVamTipoDonFromBackend(d: any): VamTipoDon {
  return {
    vtdnCodTdn: d.vtdncodtdn,
    vtdnDescn: d.vtdndescn,
    created_at: d.created_at,
    updated_at: d.updated_at
  };
}

@Injectable({
  providedIn: 'root'
})
export class VamTipoDonService {
  private baseUrl = buildApiUrl(API_CONFIG.VAMTIPODON.BASE);

  constructor(private http: HttpClient) { }

  getAllVamTipoDon(): Observable<ApiResponse<VamTipoDon[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapVamTipoDonFromBackend) : []
      }))
    );
  }

  getVamTipoDonById(id: number): Observable<ApiResponse<VamTipoDon>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamTipoDonFromBackend(response.data) : {} as VamTipoDon
      }))
    );
  }

  createVamTipoDon(tipoDon: VamTipoDon): Observable<ApiResponse<VamTipoDon>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl, tipoDon).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamTipoDonFromBackend(response.data) : {} as VamTipoDon
      }))
    );
  }

  updateVamTipoDon(id: number, tipoDon: VamTipoDon): Observable<ApiResponse<VamTipoDon>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, tipoDon).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapVamTipoDonFromBackend(response.data) : {} as VamTipoDon
      }))
    );
  }

  deleteVamTipoDon(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  searchVamTipoDonByDescn(descn: string): Observable<ApiResponse<VamTipoDon[]>> {
    const params = new HttpParams().set('descripcion', descn);
    return this.http.get<ApiResponse<any[]>>(buildApiUrl(API_CONFIG.VAMTIPODON.SEARCH), { params }).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapVamTipoDonFromBackend) : []
      }))
    );
  }
} 