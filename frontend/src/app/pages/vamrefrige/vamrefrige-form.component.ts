import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VamrefrigeService } from '../../services/vamrefrige.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamrefrige-form',
  templateUrl: './vamrefrige-form.component.html',
  styleUrls: ['./vamrefrige-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class VamrefrigeFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMsg = '';
  editMode = false;
  refrigeId: number | null = null;

  volver() {
    this.router.navigate(['/vamrefrige']);
  }

  constructor(
    private fb: FormBuilder,
    private vamrefrigeService: VamrefrigeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vrefdescri: ['', [Validators.required, Validators.maxLength(50)]],
      vrefcaract: ['', [Validators.required, Validators.maxLength(250)]],
      vrefingres: ['', Validators.required],
      vrefsalida: [''],
      vrefcantid: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.refrigeId = +id;
        this.vamrefrigeService.getById(this.refrigeId).subscribe(data => {
          this.form.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    if (this.editMode && this.refrigeId) {
      this.vamrefrigeService.update(this.refrigeId, this.form.value).subscribe({
        next: () => this.router.navigate(['/vamrefrige']),
        error: () => {
          this.errorMsg = 'Error al actualizar';
          this.loading = false;
        }
      });
    } else {
      this.vamrefrigeService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/vamrefrige']),
        error: () => {
          this.errorMsg = 'Error al crear';
          this.loading = false;
        }
      });
    }
  }
}
