import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ocupacion } from '../models/ocupacion.interface';

@Injectable({ providedIn: 'root' })
export class OcupacionService {
  private baseUrl = 'http://localhost:3000/api/ocupaciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ocupacion[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(d => ({
        vocucodocu: d.vocucodocu,
        vocudescri: d.vocudescri
      })))
    );
  }

  getById(id: number): Observable<Ocupacion> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        const d = response.data;
        return {
          vocucodocu: d.vocucodocu,
          vocudescri: d.vocudescri
        };
      })
    );
  }

  create(ocupacion: Ocupacion): Observable<Ocupacion> {
    return this.http.post<any>(this.baseUrl, ocupacion).pipe(
      map(response => response.data)
    );
  }

  update(id: number, ocupacion: Ocupacion): Observable<Ocupacion> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, ocupacion).pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
} 