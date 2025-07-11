// Constantes para el módulo de donantes

export const ESTADOS_CIVILES = [
  { value: 'S', label: 'Soltero' },
  { value: 'C', label: 'Casado' },
  { value: 'D', label: 'Divorciado' },
  { value: 'V', label: 'Viudo' }
];

export const SEXOS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' }
];

// Configuración de paginación
export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 10,
  MAX_PAGES_TO_SHOW: 5
};

// Configuración de validaciones
export const VALIDATION_CONFIG = {
  MIN_AGE: 18,
  MAX_AGE: 100,
  MIN_NAME_LENGTH: 2,
  MIN_DOCUMENT_LENGTH: 7,
  MAX_DOCUMENT_LENGTH: 8,
  PHONE_PATTERN: /^[0-9]{8}$/
};

// Mensajes de error
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  MIN_LENGTH: (min: number) => `Mínimo ${min} caracteres`,
  MAX_LENGTH: (max: number) => `Máximo ${max} caracteres`,
  EMAIL: 'Email inválido',
  PHONE: 'Formato de teléfono inválido (exactamente 8 dígitos)',
  MIN_AGE: (min: number) => `Edad mínima: ${min} años`,
  MAX_AGE: (max: number) => `Edad máxima: ${max} años`,
  LOADING_ERROR: 'Error al cargar datos',
  SAVE_ERROR: 'Error al guardar',
  DELETE_ERROR: 'Error al eliminar',
  SEARCH_ERROR: 'Error en la búsqueda',
  NETWORK_ERROR: 'Error de conexión'
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  CREATED: 'Donante creado exitosamente',
  UPDATED: 'Donante actualizado exitosamente',
  DELETED: 'Donante eliminado exitosamente'
};

// Estados de carga
export const LOADING_STATES = {
  LOADING: 'Cargando...',
  SAVING: 'Guardando...',
  DELETING: 'Eliminando...',
  SEARCHING: 'Buscando...'
};

// Configuración de la tabla
export const TABLE_CONFIG = {
  COLUMNS: [
    { key: 'vdonCodDon', label: 'Código', sortable: true },
    { key: 'fullName', label: 'Nombre Completo', sortable: true },
    { key: 'vdonDocide', label: 'Documento', sortable: false },
    { key: 'vdonFecNac', label: 'Fecha Nac.', sortable: true },
    { key: 'vdonTelCel', label: 'Teléfono', sortable: false },
    { key: 'vdonSwCita', label: 'Estado', sortable: true },
    { key: 'actions', label: 'Acciones', sortable: false }
  ]
}; 