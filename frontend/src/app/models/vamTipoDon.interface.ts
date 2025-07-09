export interface VamTipoDon {
  vtdnCodTdn: number;
  vtdnDescn: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
} 