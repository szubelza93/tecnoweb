import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VamGrupSanService } from '../../services/vamGrupSan.service';
import { VamGrupSan } from '../../models/vamGrupSan.interface';

@Component({
  selector: 'app-vam-grup-san-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vamGrupSan-form.component.html',
  styleUrls: ['./vamGrupSan-form.component.css']
})
export class VamGrupSanFormComponent implements OnInit {
  vamGrupSanForm: FormGroup;
  isEditMode = false;
  loading = false;
  error = '';
  success = '';

  // Opciones para selectores
  gruposABO = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' }
  ];

  tiposRH = [
    { value: '+', label: 'Positivo (+)' },
    { value: '-', label: 'Negativo (-)' }
  ];

  constructor(
    private fb: FormBuilder,
    private vamGrupSanService: VamGrupSanService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vamGrupSanForm = this.createForm();
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vqrsCodGrs: ['', [Validators.required]],
      vqrsGruABO: ['', [Validators.required]],
      vqrsTipoRH: ['', [Validators.required]],
      vprgCodPrg: ['', [Validators.required, Validators.min(1)]],
      vprgEstMin: ['', [Validators.required, Validators.min(0)]],
      vprgEstMax: ['', [Validators.required, Validators.min(0)]]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadVamGrupSan(id);
    }
  }

  private loadVamGrupSan(id: string): void {
    this.loading = true;
    this.vamGrupSanService.getVamGrupSanById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.vamGrupSanForm.patchValue(response.data);
        } else {
          this.error = response.message || 'Error al cargar el grupo sanguíneo';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar el grupo sanguíneo';
        this.loading = false;
        console.error('Error loading vamGrupSan:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.vamGrupSanForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const vamGrupSanData = this.vamGrupSanForm.value;
      
      // Convertir valores numéricos
      vamGrupSanData.vprgCodPrg = parseInt(vamGrupSanData.vprgCodPrg);
      vamGrupSanData.vprgEstMin = parseInt(vamGrupSanData.vprgEstMin);
      vamGrupSanData.vprgEstMax = parseInt(vamGrupSanData.vprgEstMax);

      // Validar que el máximo sea mayor que el mínimo
      if (vamGrupSanData.vprgEstMax <= vamGrupSanData.vprgEstMin) {
        this.error = 'El estándar máximo debe ser mayor que el estándar mínimo';
        this.loading = false;
        return;
      }

      if (this.isEditMode) {
        this.updateVamGrupSan(vamGrupSanData);
      } else {
        this.createVamGrupSan(vamGrupSanData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private createVamGrupSan(vamGrupSanData: VamGrupSan): void {
    this.vamGrupSanService.createVamGrupSan(vamGrupSanData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Grupo sanguíneo creado exitosamente';
          setTimeout(() => {
            this.router.navigate(['/vam-grup-san']);
          }, 2000);
        } else {
          this.error = response.message || 'Error al crear el grupo sanguíneo';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al crear el grupo sanguíneo';
        this.loading = false;
        console.error('Error creating vamGrupSan:', err);
      }
    });
  }

  private updateVamGrupSan(vamGrupSanData: VamGrupSan): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.vamGrupSanService.updateVamGrupSan(id, vamGrupSanData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Grupo sanguíneo actualizado exitosamente';
          setTimeout(() => {
            this.router.navigate(['/vam-grup-san']);
          }, 2000);
        } else {
          this.error = response.message || 'Error al actualizar el grupo sanguíneo';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al actualizar el grupo sanguíneo';
        this.loading = false;
        console.error('Error updating vamGrupSan:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/vam-grup-san']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.vamGrupSanForm.controls).forEach(key => {
      const control = this.vamGrupSanForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.vamGrupSanForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.vamGrupSanForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['min']) {
        return `El valor mínimo es ${field.errors['min'].min}`;
      }
      if (field.errors['email']) {
        return 'Formato de email inválido';
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
    }
    return '';
  }
} 