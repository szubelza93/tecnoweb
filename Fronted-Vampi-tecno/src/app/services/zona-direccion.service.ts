import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZonaDireccion } from '../models/zona-direccion.interface';

@Injectable({ providedIn: 'root' })
export class ZonaDireccionService {
  private baseUrl = 'http://localhost:3000/api/zonas-direccion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ZonaDireccion[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(z => ({
        vzonCodZon: z.vzoncodzon,
        vlugCodLug: z.vlugcodlug,
        vzonDescr: z.vzondescr
      })))
    );
  }

  getById(id: number): Observable<ZonaDireccion> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data || response)
    );
  }

  create(zona: ZonaDireccion): Observable<ZonaDireccion> {
    return this.http.post<any>(this.baseUrl, zona).pipe(
      map(response => response.data || response)
    );
  }

  update(id: number, zona: ZonaDireccion): Observable<ZonaDireccion> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, zona).pipe(
      map(response => response.data || response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
} 