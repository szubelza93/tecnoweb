import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VamcuestioService, VamCuestio, VamCuesNro } from '../../services/vamcuestio.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamcuestio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vamcuestio-form.component.html',
  styleUrls: ['./vamcuestio-form.component.css']
})
export class VamcuestioFormComponent implements OnInit {
  form!: FormGroup;
  cuesNro: VamCuesNro[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';
  editMode = false;
  cuestionarioId?: number;

  constructor(
    private fb: FormBuilder,
    private service: VamcuestioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cuestionarioId = this.route.snapshot.params['id'];
    this.editMode = !!this.cuestionarioId;
    this.initForm();
    this.service.getCuesNro().subscribe({
      next: data => this.cuesNro = data,
      error: () => this.errorMsg = 'Error al cargar los cuestionarios.'
    });
    if (this.editMode) {
      this.loading = true;
      this.service.getById(this.cuestionarioId!).subscribe({
        next: data => {
          this.form.patchValue(data);
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Error al cargar la pregunta.';
          this.loading = false;
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      vcuenrocue: [null, [Validators.required]],
      vcuepregun: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
      vcueopcio1: ['', [Validators.maxLength(10)]],
      vcueopcio2: ['', [Validators.maxLength(10)]],
      vcuerespue: ['', [Validators.maxLength(1)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    const data = this.form.value;
    if (this.editMode) {
      this.service.update(this.cuestionarioId!, data).subscribe({
        next: () => {
          this.successMsg = 'Pregunta actualizada correctamente';
          setTimeout(() => this.router.navigate(['/vamcuestio']), 1000);
        },
        error: err => {
          this.errorMsg = 'Error al actualizar la pregunta';
          this.loading = false;
        }
      });
    } else {
      this.service.create(data).subscribe({
        next: () => {
          this.successMsg = 'Pregunta creada correctamente';
          setTimeout(() => this.router.navigate(['/vamcuestio']), 1000);
        },
        error: err => {
          this.errorMsg = 'Error al crear la pregunta';
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/vamcuestio']);
  }
}
