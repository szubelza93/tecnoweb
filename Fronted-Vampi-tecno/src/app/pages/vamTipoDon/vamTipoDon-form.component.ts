import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VamTipoDonService } from '../../services/vamTipoDon.service';
import { VamTipoDon } from '../../models/vamTipoDon.interface';

@Component({
  selector: 'app-vam-tipo-don-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vamTipoDon-form.component.html',
  styleUrls: ['./vamTipoDon-form.component.css']
})
export class VamTipoDonFormComponent implements OnInit {
  tipoDonForm: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  tipoDonId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vamTipoDonService: VamTipoDonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tipoDonForm = this.fb.group({
      vtdnCodTdn: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      vtdnDescn: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.tipoDonId = +id;
        this.loadTipoDon(this.tipoDonId);
      }
    });
  }

  loadTipoDon(id: number): void {
    this.loading = true;
    this.vamTipoDonService.getVamTipoDonById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.tipoDonForm.patchValue(response.data);
        } else {
          this.error = response.message || 'No se pudo cargar el tipo de donación';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión al cargar el tipo de donación';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.tipoDonForm.invalid) return;
    this.loading = true;
    this.error = '';
    const tipoDon: VamTipoDon = this.tipoDonForm.value;
    if (this.isEditMode && this.tipoDonId !== null) {
      this.vamTipoDonService.updateVamTipoDon(this.tipoDonId, tipoDon).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/vam-tipo-don']);
          } else {
            this.error = response.message || 'Error al actualizar tipo de donación';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error de conexión al actualizar tipo de donación';
          this.loading = false;
        }
      });
    } else {
      this.vamTipoDonService.createVamTipoDon(tipoDon).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/vam-tipo-don']);
          } else {
            this.error = response.message || 'Error al crear tipo de donación';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error de conexión al crear tipo de donación';
          this.loading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/vam-tipo-don']);
  }

  get vtdnCodTdn() { return this.tipoDonForm.get('vtdnCodTdn'); }
  get vtdnDescn() { return this.tipoDonForm.get('vtdnDescn'); }
} 