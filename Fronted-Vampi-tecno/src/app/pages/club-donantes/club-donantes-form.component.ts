import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClubDonantes } from '../../models/club-donantes.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-club-donantes-form',
  templateUrl: './club-donantes-form.component.html',
  styleUrls: ['./club-donantes-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ClubDonantesFormComponent implements OnInit {
  @Input() club: ClubDonantes | null = null;
  @Output() save = new EventEmitter<ClubDonantes>();
  @Output() cancel = new EventEmitter<void>();

  clubForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clubForm = this.fb.group({
      vcluCodClu: ['', Validators.required], // Código requerido para creación y edición
      vcluDescri: ['', Validators.required],
      vcluDirecc: [''],
      vcluTelefo: ['', [Validators.pattern(/^[0-9]{8}$/)]], // Exactamente 8 dígitos
      vcluRepRes: ['']
    });
  }

  ngOnInit(): void {
    if (this.club) {
      this.clubForm.patchValue(this.club);
    }
  }

  onSubmit() {
    if (this.clubForm.valid) {
      this.save.emit(this.clubForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 