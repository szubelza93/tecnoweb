export interface Donante {
  vdonCodDon?: string;
  vdonPatern: string;
  vdonMatern: string;
  vdonNombre: string;
  vzonCodZon: string;
  vdonDirecc: string;
  vdonDesDir: string;
  vtidCodTid: string;
  vdonDocide: string;
  vdonFecNac: string;
  vdonEdadDo: number;
  vdonEstCiv: string;
  vdonSexoDn: string;
  vdonTelOfi: string;
  vdonTelCel: string;
  vdonEmail: string;
  vdonEmail2: string;
  vdonDirTra: string;
  vdonCarneT: string;
  vocuCodOcu: string;
  vgraCodGra: string;
  vlugCodLug: string;
  vcluCodClu: string;
  vresCodRes: string;
  vdonSwCita: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Campos relacionados (para mostrar información descriptiva)
  tipo_documento?: string;
  ocupacion?: string;
  grado_instruccion?: string;
  lugar_nacimiento?: string;
  club_donantes?: string;
  zona_direccion?: string;
}

export interface TipoDocumento {
  vtidCodTid: string;
  vtidDescr: string;
}

export interface Ocupacion {
  vocuCodOcu: string;
  vocudescri: string;
}

export interface GradoInstruccion {
  vgraCodGra: string;
  vgraDescrn: string;
}

export interface LugarNacimiento {
  vlugCodLug: string;
  vlugCiudad: string;
}

export interface ClubDonantes {
  vcluCodClu: string;
  vcluDescri: string;
}

export interface ZonaDireccion {
  vzonCodZon: string;
  vzonDescr: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
} 