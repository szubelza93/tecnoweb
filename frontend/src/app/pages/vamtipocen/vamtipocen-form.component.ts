import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamtipocen-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vamtipocen-form.component.html',
  styleUrls: ['./vamtipocen-form.component.css']
})
export class VamtipocenFormComponent implements OnInit {
  // ... (resto de propiedades)
  // Método público para navegación desde el template
  volver() {
    this.router.navigate(['/vamtipocen']);
  }
  form!: FormGroup;
  loading = false;
  editMode = false;
  tipoId: number | null = null;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private tipoService: VamtipocenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vtcedescri: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.tipoId = +id;
        this.loading = true;
        this.tipoService.getById(this.tipoId).subscribe({
          next: (tipo) => {
            this.form.patchValue(tipo);
            this.loading = false;
          },
          error: () => {
            this.errorMsg = 'Error al cargar el tipo de centro';
            this.loading = false;
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      if (this.editMode && this.tipoId !== null) {
        this.tipoService.update(this.tipoId, this.form.value).subscribe({
          next: () => {
            this.successMsg = 'Tipo de centro actualizado correctamente';
            this.router.navigate(['/vamtipocen']);
          },
          error: () => {
            this.errorMsg = 'Error al actualizar el tipo de centro';
            this.loading = false;
          }
        });
      } else {
        this.tipoService.create(this.form.value).subscribe({
          next: () => {
            this.successMsg = 'Tipo de centro creado correctamente';
            this.router.navigate(['/vamtipocen']);
          },
          error: () => {
            this.errorMsg = 'Error al crear el tipo de centro';
            this.loading = false;
          }
        });
      }
    }
  }
}
