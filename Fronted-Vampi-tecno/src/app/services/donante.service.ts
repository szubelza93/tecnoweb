import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Donante, 
  TipoDocumento, 
  Ocupacion, 
  GradoInstruccion, 
  LugarNacimiento, 
  ClubDonantes, 
  ZonaDireccion,
  ApiResponse 
} from '../models/donante.interface';
import { API_CONFIG, buildApiUrl } from '../config/api.config';
import { map } from 'rxjs/operators';

function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    Object.keys(obj).forEach(key => {
      const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase())
        .replace(/([a-z])([A-Z])/g, '$1$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1$2')
        .replace(/(^|_)([a-z])/g, (m, _p, c) => c.toUpperCase());
      // Asegura la primera minúscula
      const finalKey = camelKey.charAt(0).toLowerCase() + camelKey.slice(1);
      newObj[finalKey] = toCamelCase(obj[key]);
    });
    return newObj;
  }
  return obj;
}

// Función de mapeo explícita para Donante
function mapDonanteFromBackend(d: any): Donante {
  return {
    vdonCodDon: d.vdoncoddon,
    vdonPatern: d.vdonpatern,
    vdonMatern: d.vdonmatern,
    vdonNombre: d.vdonnombre,
    vzonCodZon: d.vzoncodzon,
    vdonDirecc: d.vdondirecc,
    vdonDesDir: d.vdondesdir,
    vtidCodTid: d.vtidcodtid,
    vdonDocide: d.vdondocide,
    vdonFecNac: d.vdonfecnac,
    vdonEdadDo: Number(d.vdonedaddo),
    vdonEstCiv: d.vdonestciv,
    vdonSexoDn: d.vdonsexodn,
    vdonTelOfi: d.vdonteloff || '',
    vdonTelCel: d.vdontelcel,
    vdonEmail: d.vdonemail,
    vdonEmail2: d.vdonemail2 || '',
    vdonDirTra: d.vdondirtra,
    vdonCarneT: d.vdoncarnet,
    vocuCodOcu: d.vocucodocu,
    vgraCodGra: d.vgracodgra,
    vlugCodLug: d.vlugcodlug,
    vcluCodClu: d.vclucodclu,
    vresCodRes: d.vrescodres,
    vdonSwCita: d.vdonswcita === true || d.vdonswcita === 1 || d.vdonswcita === '1',
    created_at: d.created_at,
    updated_at: d.updated_at,
    tipo_documento: d.tipo_documento,
    ocupacion: d.ocupacion,
    grado_instruccion: d.grado_instruccion,
    lugar_nacimiento: d.lugar_nacimiento,
    club_donantes: d.club_donantes,
    zona_direccion: d.zona_direccion
  };
}

@Injectable({
  providedIn: 'root'
})
export class DonanteService {
  private baseUrl = buildApiUrl(API_CONFIG.DONANTES.BASE);

  constructor(private http: HttpClient) { }

  // Operaciones CRUD principales
  getAllDonantes(): Observable<ApiResponse<Donante[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl).pipe(
      map(response => {
        console.log('Respuesta del backend:', response);
        const mappedData = Array.isArray(response.data) ? response.data.map(d => {
          console.log('Dato original:', d);
          const mapped = mapDonanteFromBackend(d);
          console.log('Dato mapeado:', mapped);
          return mapped;
        }) : [];
        console.log('Datos finales:', mappedData);
        return {
          ...response,
          data: mappedData
        };
      })
    );
  }

  getDonanteById(id: string): Observable<ApiResponse<Donante>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapDonanteFromBackend(response.data) : {} as Donante
      }))
    );
  }

  createDonante(donante: Donante): Observable<ApiResponse<Donante>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl, donante).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapDonanteFromBackend(response.data) : {} as Donante
      }))
    );
  }

  updateDonante(id: string, donante: Donante): Observable<ApiResponse<Donante>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, donante).pipe(
      map(response => ({
        ...response,
        data: response.data ? mapDonanteFromBackend(response.data) : {} as Donante
      }))
    );
  }

  deleteDonante(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  searchDonantesByNombre(nombre: string): Observable<ApiResponse<Donante[]>> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<ApiResponse<any[]>>(buildApiUrl(API_CONFIG.DONANTES.SEARCH), { params }).pipe(
      map(response => ({
        ...response,
        data: Array.isArray(response.data) ? response.data.map(mapDonanteFromBackend) : []
      }))
    );
  }

  // Servicios para datos relacionados
  getTiposDocumento(): Observable<ApiResponse<TipoDocumento[]>> {
    return this.http.get<ApiResponse<TipoDocumento[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.TIPOS_DOCUMENTO));
  }

  getOcupaciones(): Observable<ApiResponse<Ocupacion[]>> {
    return this.http.get<ApiResponse<Ocupacion[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.OCUPACIONES));
  }

  getGradosInstruccion(): Observable<ApiResponse<GradoInstruccion[]>> {
    return this.http.get<ApiResponse<GradoInstruccion[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.GRADOS_INSTRUCCION));
  }

  getLugaresNacimiento(): Observable<ApiResponse<LugarNacimiento[]>> {
    return this.http.get<ApiResponse<LugarNacimiento[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.LUGARES_NACIMIENTO));
  }

  getClubesDonantes(): Observable<ApiResponse<ClubDonantes[]>> {
    return this.http.get<ApiResponse<ClubDonantes[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.CLUBES_DONANTES));
  }

  getZonasDireccion(): Observable<ApiResponse<ZonaDireccion[]>> {
    return this.http.get<ApiResponse<ZonaDireccion[]>>(buildApiUrl(API_CONFIG.RELATED_DATA.ZONAS_DIRECCION));
  }
} 