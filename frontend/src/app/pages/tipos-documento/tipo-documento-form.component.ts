import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../models/tipo-documento.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-documento-form',
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class TipoDocumentoFormComponent implements OnInit {
  tipoDocumentoForm: FormGroup;
  isEdit = false;
  id: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.tipoDocumentoForm = this.fb.group({
      vtidCodTid: ['', Validators.required],
      vtidDescr: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.loading = true;
      this.tipoDocumentoService.getById(this.id).subscribe({
        next: (tipo) => {
          this.tipoDocumentoForm.patchValue(tipo);
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el tipo de documento';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.tipoDocumentoForm.invalid) return;
    this.loading = true;
    const tipo: TipoDocumento = this.tipoDocumentoForm.value;
    const payload = {
      vtidcodtid: tipo.vtidCodTid,
      vtiddescr: tipo.vtidDescr
    };
    if (this.isEdit && this.id) {
      this.tipoDocumentoService.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/tipos-documento']),
        error: () => {
          this.error = 'Error al actualizar';
          this.loading = false;
        }
      });
    } else {
      this.tipoDocumentoService.create(payload).subscribe({
        next: () => this.router.navigate(['/tipos-documento']),
        error: () => {
          this.error = 'Error al crear';
          this.loading = false;
        }
      });
    }
  }
} 