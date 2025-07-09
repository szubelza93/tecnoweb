import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuestionarioNumero } from '../../models/cuestionario-numero.interface';
import { CuestionarioNumeroService } from '../../services/cuestionario-numero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuestionario-numero-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './cuestionario-numero-form.component.html',
  styleUrls: ['./cuestionario-numero-form.component.css']
})
export class CuestionarioNumeroFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: CuestionarioNumeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      vcueNroCue: [null, [Validators.required, Validators.min(1)]],
      vcueDescri: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;
    if (this.isEditMode) {
      this.loadCuestionario();
      this.form.get('vcueNroCue')?.disable();
    }
  }

  loadCuestionario(): void {
    if (!this.id) return;
    this.loading = true;
    this.service.getById(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.form.patchValue(response.data);
        } else {
          this.error = response.message || 'No se pudo cargar el cuestionario';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión al cargar el cuestionario';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const data: CuestionarioNumero = {
      vcueNroCue: this.isEditMode ? this.id! : this.form.value.vcueNroCue,
      vcueDescri: this.form.value.vcueDescri
    };
    if (this.isEditMode) {
      this.service.update(this.id!, data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/cuestionarios-numeros']);
          } else {
            this.error = response.message || 'Error al actualizar';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error de conexión al actualizar';
          this.loading = false;
        }
      });
    } else {
      this.service.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/cuestionarios-numeros']);
          } else {
            this.error = response.message || 'Error al crear';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error de conexión al crear';
          this.loading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/cuestionarios-numeros']);
  }

  get vcueNroCue() { return this.form.get('vcueNroCue'); }
  get vcueDescri() { return this.form.get('vcueDescri'); }
} 