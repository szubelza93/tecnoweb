// Componente standalone para crear/editar centro de donante
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VamcentdonService, Vamcentdon } from '../../services/vamcentdon.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { Vamtipocen } from '../../models/vamtipocen.interface';

@Component({
  selector: 'app-vamcentdon-form',
  templateUrl: './vamcentdon-form.component.html',
  styleUrls: ['./vamcentdon-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class VamcentdonFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    vcennombre: ['', [Validators.required, Validators.maxLength(100)]],
    vcendirecc: ['', [Validators.maxLength(150)]],
    vcentelefo: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
    vtcecodtce: [null, [Validators.required]]
  });
  loading = false;
  errorMsg = '';
  successMsg = '';
  isEditMode = false;
  centroId: number | null = null;

  tiposCentro: Vamtipocen[] = [];

  constructor(
    private fb: FormBuilder,
    private service: VamcentdonService,
    private router: Router,
    private route: ActivatedRoute,
    private tipoService: VamtipocenService
  ) {}

  ngOnInit() {
    this.centroId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.centroId;
    this.form = this.fb.group({
      vcennombre: ['', [Validators.required, Validators.maxLength(100)]],
      vcendirecc: ['', [Validators.maxLength(150)]],
      vcentelefo: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      vtcecodtce: [null, [Validators.required]]
    });
    this.tipoService.getAll().subscribe({
      next: (tipos) => { this.tiposCentro = tipos; },
      error: () => { this.errorMsg = 'No se pudieron cargar los tipos de centro'; }
    });
    if (this.isEditMode) {
      this.cargarCentro();
    }
  }

  cargarCentro() {
    this.loading = true;
    this.service.getById(this.centroId!).subscribe({
      next: (data) => { this.form.patchValue(data); this.loading = false; },
      error: () => { this.errorMsg = 'No se pudo cargar el centro.'; this.loading = false; }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    if (this.isEditMode) {
      this.service.update(this.centroId!, this.form.value).subscribe({
        next: () => { this.successMsg = 'Actualizado correctamente'; this.loading = false; setTimeout(() => this.router.navigate(['/vamcentdon']), 1200); },
        error: () => { this.errorMsg = 'Error al actualizar.'; this.loading = false; }
      });
    } else {
      this.service.create(this.form.value).subscribe({
        next: () => { this.successMsg = 'Creado correctamente'; this.loading = false; setTimeout(() => this.router.navigate(['/vamcentdon']), 1200); },
        error: () => { this.errorMsg = 'Error al crear.'; this.loading = false; }
      });
    }
  }

  volver() { this.router.navigate(['/vamcentdon']); }
}
