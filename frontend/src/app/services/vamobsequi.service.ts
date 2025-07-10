import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vamobsequi } from '../models/vamobsequi.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VamobsequiService {
  private apiUrl = 'http://localhost:3000/api/obsequios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vamobsequi[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }

  getById(id: number): Observable<Vamobsequi> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(obsequio: Vamobsequi): Observable<Vamobsequi> {
    return this.http.post<Vamobsequi>(this.apiUrl, obsequio);
  }

  update(id: number, obsequio: Vamobsequi): Observable<Vamobsequi> {
    return this.http.put<Vamobsequi>(`${this.apiUrl}/${id}`, obsequio);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getVamObsequis(): Observable<Vamobsequi[]> {
    return this.http.get<Vamobsequi[]>('/api/obsequios');
  }
} 