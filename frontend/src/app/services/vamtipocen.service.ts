import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vamtipocen } from '../models/vamtipocen.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VamtipocenService {
  private apiUrl = 'http://localhost:3000/api/vamtipocen';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vamtipocen[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }

  getById(id: number): Observable<Vamtipocen> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(tipo: Vamtipocen): Observable<Vamtipocen> {
    return this.http.post<Vamtipocen>(this.apiUrl, tipo);
  }

  update(id: number, tipo: Vamtipocen): Observable<Vamtipocen> {
    return this.http.put<Vamtipocen>(`${this.apiUrl}/${id}`, tipo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
