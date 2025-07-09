import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GradoInstruccion } from '../../models/grado-instruccion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grado-instruccion-form',
  templateUrl: './grado-instruccion-form.component.html',
  styleUrls: ['./grado-instruccion-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class GradoInstruccionFormComponent implements OnInit {
  @Input() grado: GradoInstruccion | null = null;
  @Output() save = new EventEmitter<GradoInstruccion>();
  @Output() cancel = new EventEmitter<void>();

  gradoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gradoForm = this.fb.group({
      vgraCodGra: ['', Validators.required], // Código requerido para creación y edición
      vgraDescrn: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.grado) {
      this.gradoForm.patchValue(this.grado);
    }
  }

  onSubmit() {
    if (this.gradoForm.valid) {
      this.save.emit(this.gradoForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 