import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OcupacionService } from '../../services/ocupacion.service';
import { Ocupacion } from '../../models/ocupacion.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocupacion-form',
  templateUrl: './ocupacion-form.component.html',
  styleUrls: ['./ocupacion-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class OcupacionFormComponent implements OnInit {
  ocupacionForm: FormGroup;
  isEdit = false;
  id: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ocupacionService: OcupacionService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.ocupacionForm = this.fb.group({
      vocucodocu: [null, [Validators.required, Validators.min(1)]],
      vocudescri: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdit = true;
      this.id = Number(paramId);
      this.loading = true;
      this.ocupacionService.getById(this.id).subscribe({
        next: (ocu) => {
          this.ocupacionForm.patchValue(ocu);
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar la ocupación';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.ocupacionForm.invalid) return;
    this.loading = true;
    const payload = this.ocupacionForm.value;
    if (this.isEdit && this.id !== null) {
      this.ocupacionService.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/ocupaciones']),
        error: () => {
          this.error = 'Error al actualizar';
          this.loading = false;
        }
      });
    } else {
      this.ocupacionService.create(payload).subscribe({
        next: () => this.router.navigate(['/ocupaciones']),
        error: () => {
          this.error = 'Error al crear';
          this.loading = false;
        }
      });
    }
  }
} 