import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { VamobsequiService } from '../../services/vamobsequi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vamobsequi-form',
  templateUrl: './vamobsequi-form.component.html',
  styleUrls: ['./vamobsequi-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class VamobsequiFormComponent implements OnInit {
  form!: FormGroup;
  successMsg = '';
  errorMsg = '';
  loading = false;
  editMode = false;
  obsequioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vamobsequiService: VamobsequiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vobsdescri: ['', [Validators.required, Validators.maxLength(50)]],
      vobscaract: ['', [Validators.required, Validators.maxLength(250)]],
      vobsingres: [0, [Validators.required, Validators.min(0)]],
      vobssalida: [0, [Validators.required, Validators.min(0)]],
      vobscantid: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.obsequioId = +id;
        this.loading = true;
        this.vamobsequiService.getById(this.obsequioId).subscribe({
          next: (obsequio) => {
            this.form.patchValue(obsequio);
            this.loading = false;
          },
          error: () => {
            this.errorMsg = 'Error al cargar el obsequio';
            this.loading = false;
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      if (this.editMode && this.obsequioId) {
        this.vamobsequiService.update(this.obsequioId, this.form.value).subscribe({
          next: () => {
            this.successMsg = 'Obsequio actualizado exitosamente';
            setTimeout(() => {
              this.router.navigate(['/vamobsequi']);
            }, 1200);
          },
          error: () => {
            this.errorMsg = 'Error al actualizar el obsequio';
            this.loading = false;
          }
        });
      } else {
        this.vamobsequiService.create(this.form.value).subscribe({
          next: () => {
            this.successMsg = 'Obsequio creado exitosamente';
            setTimeout(() => {
              this.router.navigate(['/vamobsequi']);
            }, 1200);
          },
          error: () => {
            this.errorMsg = 'Error al crear el obsequio';
            this.loading = false;
          }
        });
      }
    }
  }

  volver(): void {
    this.router.navigate(['/vamobsequi']);
  }
} 