import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LugarNacimiento } from '../../models/lugar-nacimiento.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lugar-nacimiento-form',
  templateUrl: './lugar-nacimiento-form.component.html',
  styleUrls: ['./lugar-nacimiento-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LugarNacimientoFormComponent implements OnInit {
  @Input() lugar: LugarNacimiento | null = null;
  @Output() save = new EventEmitter<LugarNacimiento>();
  @Output() cancel = new EventEmitter<void>();

  lugarForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.lugarForm = this.fb.group({
      vlugCodLug: ['', Validators.required], // Código requerido para creación y edición
      vlugPaisna: ['', Validators.required],
      vlugCiudad: ['', Validators.required],
      vlugProvin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.lugar) {
      this.lugarForm.patchValue(this.lugar);
    }
  }

  onSubmit() {
    if (this.lugarForm.valid) {
      this.save.emit(this.lugarForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 