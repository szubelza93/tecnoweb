import { Component, OnInit } from '@angular/core';
import { GradoInstruccionService } from '../../services/grado-instruccion.service';
import { GradoInstruccion } from '../../models/grado-instruccion.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GradoInstruccionFormComponent } from './grado-instruccion-form.component';

@Component({
  selector: 'app-grado-instruccion',
  templateUrl: './grado-instruccion.component.html',
  styleUrls: ['./grado-instruccion.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, GradoInstruccionFormComponent]
})
export class GradoInstruccionComponent implements OnInit {
  grados: GradoInstruccion[] = [];
  filteredGrados: GradoInstruccion[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  showForm = false;
  editGradoData: GradoInstruccion | null = null;
  isEditing = false;

  constructor(
    private gradoService: GradoInstruccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGrados();
  }

  loadGrados(): void {
    this.loading = true;
    this.error = '';
    this.gradoService.getAll().subscribe({
      next: (grados) => {
        this.grados = grados;
        this.filteredGrados = [...this.grados];
        this.totalItems = this.grados.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar grados de instrucción';
        this.loading = false;
      }
    });
  }

  searchGrados(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredGrados = [...this.grados];
      this.totalItems = this.grados.length;
      this.currentPage = 1;
      return;
    }
    this.filteredGrados = this.grados.filter(grad =>
      Object.values(grad).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
    this.totalItems = this.filteredGrados.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredGrados = [...this.grados];
    this.totalItems = this.grados.length;
    this.currentPage = 1;
  }

  get paginatedGrados(): GradoInstruccion[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredGrados.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  createGrado(): void {
    // Generar el siguiente código disponible
    const maxCode = this.grados.length > 0 
      ? Math.max(...this.grados.map(g => g.vgraCodGra))
      : 0;
    const nextCode = maxCode + 1;
    
    this.editGradoData = {
      vgraCodGra: nextCode,
      vgraDescrn: ''
    };
    this.isEditing = false;
    this.showForm = true;
  }

  editGrado(grad: GradoInstruccion): void {
    this.editGradoData = { ...grad };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteGrado(grad: GradoInstruccion): void {
    if (confirm(`¿Está seguro de eliminar el grado ${grad.vgraDescrn}?`)) {
      this.loading = true;
      this.gradoService.delete(grad.vgraCodGra).subscribe({
        next: () => {
          this.loadGrados();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar grado de instrucción';
          this.loading = false;
        }
      });
    }
  }

  onSaveGrado(grado: GradoInstruccion) {
    if (this.isEditing) {
      // Edición
      this.gradoService.updateGradoInstruccion(grado).subscribe({
        next: () => {
          this.loadGrados();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al actualizar el grado.'
      });
    } else {
      // Creación
      this.gradoService.createGradoInstruccion(grado).subscribe({
        next: () => {
          this.loadGrados();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al crear el grado.'
      });
    }
  }

  onCancelForm() {
    this.showForm = false;
    this.isEditing = false;
  }
} 