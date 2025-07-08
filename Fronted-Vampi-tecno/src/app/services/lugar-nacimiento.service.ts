import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LugarNacimiento } from '../models/lugar-nacimiento.interface';

@Injectable({ providedIn: 'root' })
export class LugarNacimientoService {
  private baseUrl = 'http://localhost:3000/api/lugares-nacimiento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LugarNacimiento[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(d => ({
        vlugcodlug: d.vlugcodlug,
        vlugpaisna: d.vlugpaisna,
        vlugciudad: d.vlugciudad,
        vlugprovin: d.vlugprovin
      })))
    );
  }

  getById(id: number): Observable<LugarNacimiento> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(lugar: any): Observable<LugarNacimiento> {
    return this.http.post<any>(this.baseUrl, lugar).pipe(
      map(response => response.data)
    );
  }

  update(id: number, lugar: any): Observable<LugarNacimiento> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, lugar).pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createLugarNacimiento(lugar: any): Observable<LugarNacimiento> {
    return this.create(lugar);
  }

  updateLugarNacimiento(lugar: LugarNacimiento): Observable<LugarNacimiento> {
    return this.update(lugar.vlugcodlug, lugar);
  }
} 