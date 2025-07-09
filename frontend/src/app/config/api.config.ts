export const API_CONFIG = {
  // URL base del backend
  BASE_URL: 'http://localhost:3000/api',
  
  // Endpoints de donantes
  DONANTES: {
    BASE: '/donantes',
    SEARCH: '/donantes/search/nombre',
    BY_ID: (id: string) => `/donantes/${id}`
  },
  
  // Endpoints de vamGrupSan
  VAMGRUPSAN: {
    BASE: '/grupos-sanguineos',
    SEARCH: '/grupos-sanguineos/search/grupo-abo',
    BY_ID: (id: string) => `/grupos-sanguineos/${id}`
  },
  
  // Endpoints de vamTipoDon
  VAMTIPODON: {
    BASE: '/tipos-donacion',
    SEARCH: '/tipos-donacion/search/descripcion',
    BY_ID: (id: string) => `/tipos-donacion/${id}`
  },
  
  // Endpoints de datos relacionados
  RELATED_DATA: {
    TIPOS_DOCUMENTO: '/tipos-documento',
    OCUPACIONES: '/ocupaciones',
    GRADOS_INSTRUCCION: '/grados-instruccion',
    LUGARES_NACIMIENTO: '/lugares-nacimiento',
    CLUBES_DONANTES: '/clubs-donantes',
    ZONAS_DIRECCION: '/zonas-direccion'
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 