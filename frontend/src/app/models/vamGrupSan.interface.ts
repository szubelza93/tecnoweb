export interface VamGrupSan {
  vqrsCodGrs?: string;
  vqrsGruABO: string;
  vqrsTipoRH: string;
  vprgCodPrg: string;
  vprgEstMin: number;
  vprgEstMax: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
} 