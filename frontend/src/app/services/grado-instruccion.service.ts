import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GradoInstruccion } from '../models/grado-instruccion.interface';

@Injectable({ providedIn: 'root' })
export class GradoInstruccionService {
  private baseUrl = 'http://localhost:3000/api/grados-instruccion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GradoInstruccion[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(d => ({
        vgraCodGra: d.vgraCodGra || d.vgracodgra,
        vgraDescrn: d.vgraDescrn || d.vgradescrn
      })))
    );
  }

  getById(id: number): Observable<GradoInstruccion> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(grado: any): Observable<GradoInstruccion> {
    console.log('JSON enviado al crear:', grado);
    return this.http.post<any>(this.baseUrl, grado).pipe(
      map(response => response.data)
    );
  }

  update(id: number, grado: any): Observable<GradoInstruccion> {
    console.log('JSON enviado al actualizar:', grado);
    return this.http.put<any>(`${this.baseUrl}/${id}`, grado).pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createGradoInstruccion(grado: any): Observable<GradoInstruccion> {
    return this.create(grado);
  }

  updateGradoInstruccion(grado: GradoInstruccion): Observable<GradoInstruccion> {
    return this.update(grado.vgraCodGra, grado);
  }
} 