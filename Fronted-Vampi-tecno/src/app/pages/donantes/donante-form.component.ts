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
  error = '';
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
      vdonDocide: ['', [Validators.required, Validators.minLength(VALIDATION_CONFIG.MIN_DOCUMENT_LENGTH)]],
      vdonFecNac: ['', Validators.required],
      vdonEdadDo: ['', [Validators.required, Validators.min(VALIDATION_CONFIG.MIN_AGE), Validators.max(VALIDATION_CONFIG.MAX_AGE)]],
      vdonEstCiv: ['', Validators.required],
      vdonSexoDn: ['', Validators.required],
      vdonTelOfi: [''],
      vdonTelCel: ['', [Validators.required, Validators.pattern(VALIDATION_CONFIG.PHONE_PATTERN)]],
      vdonEmail: ['', [Validators.email]],
      vdonEmail2: ['', [Validators.email]],
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
    }
  }

  private loadDonante(id: string): void {
    this.loading = true;
    this.donanteService.getDonanteById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.donanteForm.patchValue(response.data);
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

  private loadRelatedData(): void {
    // Cargar todos los datos relacionados en paralelo
    Promise.all([
      this.donanteService.getTiposDocumento().toPromise(),
      this.donanteService.getOcupaciones().toPromise(),
      this.donanteService.getGradosInstruccion().toPromise(),
      this.donanteService.getLugaresNacimiento().toPromise(),
      this.donanteService.getClubesDonantes().toPromise(),
      this.donanteService.getZonasDireccion().toPromise()
    ]).then(([tiposDoc, ocup, grados, lugares, clubes, zonas]) => {
      if (tiposDoc?.success) this.tiposDocumento = tiposDoc.data;
      if (ocup?.success) this.ocupaciones = ocup.data;
      if (grados?.success) this.gradosInstruccion = grados.data;
      if (lugares?.success) this.lugaresNacimiento = lugares.data;
      if (clubes?.success) this.clubesDonantes = clubes.data;
      if (zonas?.success) this.zonasDireccion = zonas.data;
    }).catch(err => {
      console.error('Error loading related data:', err);
      this.error = 'Error al cargar datos relacionados';
    });
  }

  onSubmit(): void {
    if (this.donanteForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const donanteData = this.donanteForm.value;
      
      // Convertir edad a número
      donanteData.vdonEdadDo = parseInt(donanteData.vdonEdadDo);

      if (this.isEditMode) {
        this.updateDonante(donanteData);
      } else {
        this.createDonante(donanteData);
      }
    } else {
      this.markFormGroupTouched();
    }
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
        this.error = ERROR_MESSAGES.NETWORK_ERROR;
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
      control?.markAsTouched();
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