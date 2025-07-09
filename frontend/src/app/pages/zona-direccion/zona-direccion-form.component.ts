import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZonaDireccion } from '../../models/zona-direccion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zona-direccion-form',
  templateUrl: './zona-direccion-form.component.html',
  styleUrls: ['./zona-direccion-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ZonaDireccionFormComponent implements OnInit {
  @Input() zona: ZonaDireccion | null = null;
  @Output() save = new EventEmitter<ZonaDireccion>();
  @Output() cancel = new EventEmitter<void>();

  zonaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.zonaForm = this.fb.group({
      vzonCodZon: ['', Validators.required],
      vlugCodLug: ['', Validators.required],
      vzonDescr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    if (this.zona) {
      this.zonaForm.patchValue(this.zona);
    }
  }

  onSubmit() {
    if (this.zonaForm.valid) {
      this.save.emit(this.zonaForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 