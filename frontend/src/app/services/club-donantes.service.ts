import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClubDonantes } from '../models/club-donantes.interface';

@Injectable({ providedIn: 'root' })
export class ClubDonantesService {
  private baseUrl = 'http://localhost:3000/api/clubs-donantes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClubDonantes[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => (response.data as any[]).map(d => ({
        vcluCodClu: d.vcluCodClu || d.vclucodclu,
        vcluDescri: d.vcluDescri || d.vcludescri,
        vcluDirecc: d.vcluDirecc || d.vcludirecc,
        vcluTelefo: d.vcluTelefo || d.vclutelefo,
        vcluRepRes: d.vcluRepRes || d.vclurepres
      })))
    );
  }

  getById(id: number): Observable<ClubDonantes> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(club: any): Observable<ClubDonantes> {
    console.log('JSON enviado al crear:', club);
    return this.http.post<any>(this.baseUrl, club).pipe(
      map(response => response.data)
    );
  }

  update(id: number, club: any): Observable<ClubDonantes> {
    console.log('JSON enviado al actualizar:', club);
    return this.http.put<any>(`${this.baseUrl}/${id}`, club).pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createClubDonantes(club: any): Observable<ClubDonantes> {
    return this.create(club);
  }

  updateClubDonantes(club: ClubDonantes): Observable<ClubDonantes> {
    return this.update(club.vcluCodClu, club);
  }
} 