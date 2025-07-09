import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoAlmacen } from '../../models/equipo-almacen.interface';
import { EquipoAlmacenService } from '../../services/equipo-almacen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipo-almacen-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './equipo-almacen-form.component.html',
  styleUrls: ['./equipo-almacen-form.component.css']
})
export class EquipoAlmacenFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: EquipoAlmacenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      vequcodequ: [null, [Validators.required, Validators.min(1)]],
      vequdescn: ['', [Validators.required, Validators.maxLength(255)]],
      vequcaract: ['', [Validators.required, Validators.maxLength(255)]],
      vequtipequ: ['', [Validators.required, Validators.maxLength(100)]],
      vequtotf: [0, [Validators.required, Validators.min(0)]],
      vequtotcol: [0, [Validators.required, Validators.min(0)]],
      vequtemper: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;
    if (this.isEditMode) {
      this.loadEquipo();
    }
  }

  loadEquipo(): void {
    if (!this.id) return;
    this.loading = true;
    this.service.getById(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.form.patchValue(response.data);
        } else {
          this.error = response.message || 'No se pudo cargar el equipo';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión al cargar el equipo';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    if (this.isEditMode) {
      this.form.get('vequcodequ')?.enable();
    }
    const data: any = {
      vequCodEqu: this.form.get('vequcodequ')?.value,
      vequDescn: this.form.get('vequdescn')?.value,
      vequCaract: this.form.get('vequcaract')?.value,
      vequTipEqu: this.form.get('vequtipequ')?.value,
      vequTotF: this.form.get('vequtotf')?.value,
      vequTotCol: this.form.get('vequtotcol')?.value,
      vequTemper: this.form.get('vequtemper')?.value
    };
    if (this.isEditMode) {
      this.service.update(this.id!, data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/equipos-almacen']);
          } else {
            this.error = response.message || 'Error al actualizar';
          }
          this.loading = false;
          this.form.get('vequcodequ')?.disable();
        },
        error: () => {
          this.error = 'Error de conexión al actualizar';
          this.loading = false;
          this.form.get('vequcodequ')?.disable();
        }
      });
    } else {
      this.service.create(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/equipos-almacen']);
          } else {
            this.error = response.message || 'Error al crear';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error de conexión al creado';
          this.loading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/equipos-almacen']);
  }

  // Getters para validaciones
  get vequcodequ() { return this.form.get('vequcodequ'); }
  get vequdescn() { return this.form.get('vequdescn'); }
  get vequcaract() { return this.form.get('vequcaract'); }
  get vequtipequ() { return this.form.get('vequtipequ'); }
  get vequtotf() { return this.form.get('vequtotf'); }
  get vequtotcol() { return this.form.get('vequtotcol'); }
  get vequtemper() { return this.form.get('vequtemper'); }
} 