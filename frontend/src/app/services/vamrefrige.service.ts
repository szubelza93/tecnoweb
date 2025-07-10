import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vamrefrige } from '../models/vamrefrige.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VamrefrigeService {
  private apiUrl = 'http://localhost:3000/api/refrigeradores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vamrefrige[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }

  getById(id: number): Observable<Vamrefrige> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(refrige: Vamrefrige): Observable<Vamrefrige> {
    return this.http.post<any>(this.apiUrl, refrige).pipe(
      map(response => response.data)
    );
  }

  update(id: number, refrige: Vamrefrige): Observable<Vamrefrige> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, refrige).pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
