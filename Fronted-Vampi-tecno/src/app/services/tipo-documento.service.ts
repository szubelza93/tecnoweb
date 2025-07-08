import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoDocumento } from '../models/tipo-documento.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private baseUrl = 'http://localhost:3000/api/tipos-documento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoDocumento[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(d => ({
        vtidCodTid: d.vtidcodtid,
        vtidDescr: d.vtiddescr
      })))
    );
  }

  getById(id: string): Observable<TipoDocumento> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        const d = response.data;
        return {
          vtidCodTid: d.vtidcodtid,
          vtidDescr: d.vtiddescr
        };
      })
    );
  }

  create(tipo: any): Observable<TipoDocumento> {
    return this.http.post<any>(this.baseUrl, tipo).pipe(
      map(response => {
        const d = response.data;
        return {
          vtidCodTid: d.vtidcodtid,
          vtidDescr: d.vtiddescr
        };
      })
    );
  }

  update(id: string, tipo: any): Observable<TipoDocumento> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, tipo).pipe(
      map(response => {
        const d = response.data;
        return {
          vtidCodTid: d.vtidcodtid,
          vtidDescr: d.vtiddescr
        };
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
} 