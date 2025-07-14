import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface VamCuestio {
  vcuenropre: number;
  vcuenrocue: number;
  vcuepregun: string;
  vcueopcio1?: string;
  vcueopcio2?: string;
  vcuerespue?: string;
}

export interface VamCuesNro {
  vcuenrocue: number;
  vcuedescri: string;
}

@Injectable({ providedIn: 'root' })
export class VamcuestioService {
  private apiUrl = 'http://localhost:3000/api/cuestionarios';
  private apiCuesNroUrl = 'http://localhost:3000/api/cuestionarios-numeros';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VamCuestio[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((resp: any) => resp.data)
    );
  }

  getById(id: number): Observable<VamCuestio> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((resp: any) => resp.data)
    );
  }

  create(data: Partial<VamCuestio>): Observable<VamCuestio> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map((resp: any) => resp.data)
    );
  }

  update(id: number, data: Partial<VamCuestio>): Observable<VamCuestio> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(
      map((resp: any) => resp.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCuesNro(): Observable<VamCuesNro[]> {
    return this.http.get<any>(this.apiCuesNroUrl).pipe(
      map((resp: any) => resp.data)
    );
  }
}
