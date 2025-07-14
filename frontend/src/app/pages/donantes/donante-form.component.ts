import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonanteService } from '../../services/donante.service';
import { 
  Donante, 
  TipoDocumento, 
  Ocupacion, 
  GradoInstruccion, 
  LugarNacimiento, 
  ClubDonantes, 
  ZonaDireccion 
} from '../../models/donante.interface';
import { 
  ESTADOS_CIVILES, 
  SEXOS, 
  VALIDATION_CONFIG, 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES, 
  LOADING_STATES 
} from '../../constants/donante.constants';

@Component({
  selector: 'app-donante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donante-form.component.html',
  styleUrls: ['./donante-form.component.css']
})
export class DonanteFormComponent implements OnInit {
  donanteForm: FormGroup;
  isEditMode = false;
  loading = false;
  error: any = '';
  success = '';
  
  // Datos para los selectores
  tiposDocumento: TipoDocumento[] = [];
  ocupaciones: Ocupacion[] = [];
  gradosInstruccion: GradoInstruccion[] = [];
  lugaresNacimiento: LugarNacimiento[] = [];
  clubesDonantes: ClubDonantes[] = [];
  zonasDireccion: ZonaDireccion[] = [];

  // Opciones para selectores simples
  estadosCiviles = ESTADOS_CIVILES;
  sexos = SEXOS;

  constructor(
    private fb: FormBuilder,
    private donanteService: DonanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.donanteForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadRelatedData();
    this.checkEditMode();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vdonCodDon: [''],
      vdonPatern: ['', [Validators.required, Validators.minLength(VALIDATION_CONFIG.MIN_NAME_LENGTH)]],
      vdonMatern: ['', [Validators.required, Validators.minLength(VALIDATION_CONFIG.MIN_NAME_LENGTH)]],
      vdonNombre: ['', [Validators.required, Validators.minLength(VALIDATION_CONFIG.MIN_NAME_LENGTH)]],
      vzonCodZon: ['', Validators.required],
      vdonDirecc: ['', Validators.required],
      vdonDesDir: [''],
      vtidCodTid: ['', Validators.required],
      vdonDocide: ['', [Validators.required, Validators.minLength(VALIDATION_CONFIG.MIN_DOCUMENT_LENGTH), Validators.maxLength(VALIDATION_CONFIG.MAX_DOCUMENT_LENGTH)]],
      vdonFecNac: ['', Validators.required],
      vdonEdadDo: ['', [Validators.required, Validators.min(VALIDATION_CONFIG.MIN_AGE), Validators.max(VALIDATION_CONFIG.MAX_AGE)]],
      vdonEstCiv: ['', Validators.required],
      vdonSexoDn: ['', Validators.required],
      vdonTelDom: [''],
      vdonTelOff: [''],
      vdonTelCel: ['', [Validators.required, Validators.pattern(VALIDATION_CONFIG.PHONE_PATTERN)]],
      vdonEmail: ['', [Validators.email]],
      vdonTrabaj: [''],
      vdonDirTra: [''],
      vdonCarneT: [''],
      vocuCodOcu: ['', Validators.required],
      vgraCodGra: ['', Validators.required],
      vlugCodLug: ['', Validators.required],
      vcluCodClu: [''],
      vresCodRes: [''],
      vdonSwCita: [true]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadDonante(id);
    } else {
      // En modo creación, obtener el siguiente código automáticamente
      this.loadNextCode();
    }
  }

  private loadDonante(id: string): void {
    this.loading = true;
    console.log('=== CARGANDO DONANTE ===');
    console.log('ID del donante:', id);
    
    this.donanteService.getDonanteById(id).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA DEL SERVICIO ===');
        console.log('Respuesta completa:', response);
        console.log('Datos del donante:', response.data);
        
        if (response.success) {
          console.log('=== APLICANDO DATOS AL FORMULARIO ===');
          // Corregir formato de fecha para el input type="date"
          if (response.data.vdonFecNac) {
            response.data.vdonFecNac = response.data.vdonFecNac.substring(0, 10);
          }
          console.log('Datos a aplicar:', response.data);
          this.donanteForm.patchValue(response.data);
          console.log('=== ESTADO DEL FORMULARIO DESPUÉS DE PATCH ===');
          console.log('Valores del formulario:', this.donanteForm.value);
        } else {
          this.error = response.message || 'Error al cargar el donante';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar el donante';
        this.loading = false;
        console.error('Error loading donante:', err);
      }
    });
  }

  private loadNextCode(): void {
    this.donanteService.getNextCode().subscribe({
      next: (response) => {
        if (response.success) {
          this.donanteForm.patchValue({ vdonCodDon: response.data.nextCode });
          console.log('Código asignado:', response.data.nextCode);
        } else {
          this.error = response.message || 'Error al obtener el código';
        }
      },
      error: (err) => {
        this.error = 'Error de conexión al obtener el código';
        console.error('Error loading next code:', err);
      }
    });
  }

  private loadRelatedData(): void {
    // Cargar lugares de nacimiento
    this.donanteService.getLugaresNacimiento().subscribe(lugares => {
      this.lugaresNacimiento = this.mapLugarNacimientoCampos(lugares);
      console.log('Lugares de nacimiento:', this.lugaresNacimiento);
    });
    // Tipos de documento
    this.donanteService.getTiposDocumento().subscribe(response => {
      this.tiposDocumento = this.mapTiposDocumentoCampos(response.data);
    });
    // Ocupaciones
    this.donanteService.getOcupaciones().subscribe(response => {
      this.ocupaciones = this.mapOcupacionesCampos(response.data);
    });
    // Grados de instrucción
    this.donanteService.getGradosInstruccion().subscribe(response => {
      this.gradosInstruccion = this.mapGradosInstruccionCampos(response.data);
    });
    // Clubes de donantes
    this.donanteService.getClubesDonantes().subscribe(response => {
      this.clubesDonantes = this.mapClubesDonantesCampos(response.data);
    });
    // Zonas de dirección
    this.donanteService.getZonasDireccion().subscribe(response => {
      this.zonasDireccion = this.mapZonasDireccionCampos(response.data);
    });
  }

  // Mapea los campos de los lugares de nacimiento a camelCase para que coincidan con la interfaz
  private mapLugarNacimientoCampos(lugares: any[]): LugarNacimiento[] {
    return lugares.map(lugar => ({
      vlugCodLug: lugar.vlugcodlug,
      vlugCiudad: lugar.vlugciudad,
      vlugPaisNa: lugar.vlugpaisna,
      vlugProvin: lugar.vlugprovin
    }));
  }

  private mapTiposDocumentoCampos(tipos: any[]): TipoDocumento[] {
    return tipos.map(tipo => ({
      vtidCodTid: tipo.vtidcodtid,
      vtidDescr: tipo.vtiddescr
    }));
  }

  private mapOcupacionesCampos(ocupaciones: any[]): Ocupacion[] {
    return ocupaciones.map(ocu => ({
      vocuCodOcu: ocu.vocucodocu,
      vocudescri: ocu.vocudescri
    }));
  }

  private mapGradosInstruccionCampos(grados: any[]): GradoInstruccion[] {
    return grados.map(gra => ({
      vgraCodGra: gra.vgracodgra,
      vgraDescrn: gra.vgradescrn
    }));
  }

  private mapClubesDonantesCampos(clubes: any[]): ClubDonantes[] {
    return clubes.map(clu => ({
      vcluCodClu: clu.vclucodclu,
      vcluDescri: clu.vcludescri
    }));
  }

  private mapZonasDireccionCampos(zonas: any[]): ZonaDireccion[] {
    return zonas.map(zona => ({
      vzonCodZon: zona.vzoncodzon,
      vzonDescr: zona.vzondescr
    }));
  }

  onSubmit(): void {
    console.log('=== DATOS DEL FORMULARIO ===');
    console.log('Formulario válido:', this.donanteForm.valid);
    console.log('Valores del formulario:', this.donanteForm.value);
    console.log('Errores del formulario:', this.donanteForm.errors);
    
    // Mostrar errores de cada campo
    Object.keys(this.donanteForm.controls).forEach(key => {
      const control = this.donanteForm.get(key);
      if (control && control.invalid) {
        console.log(`Campo ${key}:`, {
          value: control.value,
          errors: control.errors,
          touched: control.touched,
          dirty: control.dirty
        });
      }
    });
    
    if (this.donanteForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const donanteData = { ...this.donanteForm.value };
      // Convertir edad a número
      donanteData.vdonEdadDo = parseInt(donanteData.vdonEdadDo);
      // Convertir campos booleanos/números
      donanteData.vdonCarneT = donanteData.vdonCarneT === true || donanteData.vdonCarneT === 1 || donanteData.vdonCarneT === "1" ? 1 : 0;
      donanteData.vdonSwCita = donanteData.vdonSwCita === true || donanteData.vdonSwCita === 1 || donanteData.vdonSwCita === "1" ? 1 : 0;

      console.log('=== DATOS A ENVIAR AL BACKEND ===');
      console.log('Datos del donante:', donanteData);

      if (this.isEditMode) {
        this.updateDonante(donanteData);
      } else {
        this.createDonante(donanteData);
      }
    } else {
      this.markFormGroupTouched();
      this.showValidationErrors();
    }
  }

  private showValidationErrors(): void {
    const errors: string[] = [];
    Object.keys(this.donanteForm.controls).forEach(key => {
      const control = this.donanteForm.get(key);
      if (control && control.invalid) {
        const fieldName = this.getFieldDisplayName(key);
        const errorMessage = this.getFieldError(key);
        if (errorMessage) {
          errors.push(`${fieldName}: ${errorMessage}`);
        }
      }
    });
    
    if (errors.length > 0) {
      this.error = {
        message: 'Errores de validación detectados:',
        errors: errors
      };
    }
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      'vdonPatern': 'Apellido Paterno',
      'vdonMatern': 'Apellido Materno',
      'vdonNombre': 'Nombres',
      'vzonCodZon': 'Zona',
      'vdonDirecc': 'Dirección',
      'vtidCodTid': 'Tipo de Documento',
      'vdonDocide': 'Número de Documento',
      'vdonFecNac': 'Fecha de Nacimiento',
      'vdonEdadDo': 'Edad',
      'vdonEstCiv': 'Estado Civil',
      'vdonSexoDn': 'Sexo',
      'vdonTelCel': 'Teléfono Celular',
      'vocuCodOcu': 'Ocupación',
      'vgraCodGra': 'Grado de Instrucción',
      'vlugCodLug': 'Lugar de Nacimiento'
    };
    return fieldNames[fieldName] || fieldName;
  }

  private createDonante(donanteData: Donante): void {
    this.donanteService.createDonante(donanteData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = SUCCESS_MESSAGES.CREATED;
          setTimeout(() => {
            this.router.navigate(['/donantes']);
          }, 2000);
        } else {
          this.error = response.message || ERROR_MESSAGES.SAVE_ERROR;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error completo del backend:', err);
        
        if (err.error && err.error.errors) {
          // Errores de validación del backend
          this.error = {
            message: err.error.message || 'Errores de validación del backend:',
            errors: err.error.errors.map((error: any) => `${error.field}: ${error.message}`)
          };
        } else if (err.error && err.error.message) {
          // Error general del backend
          this.error = err.error.message;
        } else {
          // Error de red o desconocido
          this.error = 'Error de conexión o servidor';
        }
        
        this.loading = false;
        console.error('Error creating donante:', err);
      }
    });
  }

  private updateDonante(donanteData: Donante): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.donanteService.updateDonante(id, donanteData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = SUCCESS_MESSAGES.UPDATED;
          setTimeout(() => {
            this.router.navigate(['/donantes']);
          }, 2000);
        } else {
          this.error = response.message || ERROR_MESSAGES.SAVE_ERROR;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = ERROR_MESSAGES.NETWORK_ERROR;
        this.loading = false;
        console.error('Error updating donante:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/donantes']);
  }

  // Utilidades para validación
  private markFormGroupTouched(): void {
    Object.keys(this.donanteForm.controls).forEach(key => {
      const control = this.donanteForm.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.donanteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.donanteForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return ERROR_MESSAGES.REQUIRED;
      if (field.errors['minlength']) return ERROR_MESSAGES.MIN_LENGTH(field.errors['minlength'].requiredLength);
      if (field.errors['maxlength']) return ERROR_MESSAGES.MAX_LENGTH(field.errors['maxlength'].requiredLength);
      if (field.errors['email']) return ERROR_MESSAGES.EMAIL;
      if (field.errors['pattern']) return ERROR_MESSAGES.PHONE;
      if (field.errors['min']) return ERROR_MESSAGES.MIN_AGE(field.errors['min'].min);
      if (field.errors['max']) return ERROR_MESSAGES.MAX_AGE(field.errors['max'].max);
    }
    return '';
  }

  // Calcular edad automáticamente
  onFechaNacimientoChange(): void {
    const fechaNac = this.donanteForm.get('vdonFecNac')?.value;
    if (fechaNac) {
      const today = new Date();
      const birthDate = new Date(fechaNac);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        this.donanteForm.patchValue({ vdonEdadDo: age - 1 });
      } else {
        this.donanteForm.patchValue({ vdonEdadDo: age });
      }
    }
  }
} 