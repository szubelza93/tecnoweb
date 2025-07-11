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

// Interfaces para el detalle del donante (respuesta del backend)
export interface DonanteDetalle {
  id: string;
  nombreCompleto: string;
  documento: string;
  email: string;
  telefono: string;
  edad: number;
  estadoCivil: string;
  sexo: string;
  direccion: DonanteDireccion;
  informacionPersonal: DonanteInformacionPersonal;
  informacionLaboral: DonanteInformacionLaboral;
  contactos: DonanteContactos;
  informacionAdicional: DonanteInformacionAdicional;
  created_at?: string;
  updated_at?: string;
}

export interface DonanteDireccion {
  zona: string;
  direccion: string;
  descripcion: string;
}

export interface DonanteInformacionPersonal {
  fechaNacimiento: string;
  edad: number;
  estadoCivil: string;
  sexo: string;
  tipoDocumento: string;
}

export interface DonanteInformacionLaboral {
  ocupacion: string;
  trabajo: string;
  direccionTrabajo: string;
  gradoInstruccion: string;
}

export interface DonanteContactos {
  telefonoDomicilio: string;
  telefonoOficina: string;
  telefonoCelular: string;
  email: string;
}

export interface DonanteInformacionAdicional {
  lugarNacimiento: string;
  clubDonantes: string;
  zonaDireccion: string;
  carnetTrabajo: string;
  cita: boolean;
  codigoReserva?: string;
}

// Interfaz para los datos formateados que devuelve el backend en la lista
export interface DonanteListado {
  id: number;
  nombreCompleto: string;
  documento: string;
  email: string;
  telefono: string;
  edad: number;
  estadoCivil: string;
  sexo: string;
  ocupacion: string;
  gradoInstruccion: string;
  lugarNacimiento: string;
  clubDonantes: string;
  zonaDireccion: string;
  fechaNacimiento: string;
  direccion: {
    zona: string;
    direccion: string;
    descripcion: string;
  };
  informacionPersonal: {
    fechaNacimiento: string;
    edad: number;
    estadoCivil: string;
    sexo: string;
    tipoDocumento: string;
  };
  contactos: {
    telefonoDomicilio: string;
    telefonoOficina: string;
    telefonoCelular: string;
    email: string;
  };
  informacionLaboral: {
    ocupacion: string;
    trabajo: string;
    direccionTrabajo: string;
    gradoInstruccion: string;
  };
  informacionAdicional: {
    lugarNacimiento: string;
    clubDonantes: string;
    zonaDireccion: string;
    carnetTrabajo: string;
    cita: boolean;
  };
} 