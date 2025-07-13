import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Vamcentdon {
  vcencodcen: number;
  vcennombre: string;
  vcendirecc: string;
  vcentelefo: string;
  vtcecodtce: number;
}

@Injectable({ providedIn: 'root' })
export class VamcentdonService {
  private apiUrl = 'http://localhost:3000/api/vamcentdon';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vamcentdon[]> {
    return this.http.get<any>(this.apiUrl).pipe(map(resp => resp.data));
  }

  getById(id: number): Observable<Vamcentdon> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map(resp => resp.data));
  }

  create(data: Partial<Vamcentdon>): Observable<Vamcentdon> {
    return this.http.post<any>(this.apiUrl, data).pipe(map(resp => resp.data));
  }

  update(id: number, data: Partial<Vamcentdon>): Observable<Vamcentdon> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(map(resp => resp.data));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
