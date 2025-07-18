import { Component, OnInit } from '@angular/core';
import { LugarNacimientoService } from '../../services/lugar-nacimiento.service';
import { LugarNacimiento } from '../../models/lugar-nacimiento.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LugarNacimientoFormComponent } from './lugar-nacimiento-form.component';

@Component({
  selector: 'app-lugar-nacimiento',
  templateUrl: './lugar-nacimiento.component.html',
  styleUrls: ['./lugar-nacimiento.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LugarNacimientoFormComponent]
})
export class LugarNacimientoComponent implements OnInit {
  lugares: LugarNacimiento[] = [];
  filteredLugares: LugarNacimiento[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  showForm = false;
  editLugarData: LugarNacimiento | null = null;
  isEditing = false;

  constructor(
    private lugarService: LugarNacimientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLugares();
  }

  loadLugares(): void {
    this.loading = true;
    this.error = '';
    this.lugarService.getAll().subscribe({
      next: (lugares) => {
        this.lugares = lugares;
        this.filteredLugares = [...this.lugares];
        this.totalItems = this.lugares.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar lugares de nacimiento';
        this.loading = false;
      }
    });
  }

  searchLugares(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredLugares = [...this.lugares];
      this.totalItems = this.lugares.length;
      this.currentPage = 1;
      return;
    }
    this.filteredLugares = this.lugares.filter(lug =>
      Object.values(lug).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
    this.totalItems = this.filteredLugares.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredLugares = [...this.lugares];
    this.totalItems = this.lugares.length;
    this.currentPage = 1;
  }

  get paginatedLugares(): LugarNacimiento[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredLugares.slice(startIndex, endIndex);
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

  createLugar(): void {
    // Generar el siguiente código disponible
    const maxCode = this.lugares.length > 0 
      ? Math.max(...this.lugares.map(l => l.vlugCodLug))
      : 0;
    const nextCode = maxCode + 1;
    
    this.editLugarData = {
      vlugCodLug: nextCode,
      vlugPaisna: '',
      vlugCiudad: '',
      vlugProvin: ''
    };
    this.isEditing = false;
    this.showForm = true;
  }

  editLugar(lug: LugarNacimiento): void {
    this.editLugarData = { ...lug };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteLugar(lug: LugarNacimiento): void {
    if (confirm(`¿Está seguro de eliminar el lugar ${lug.vlugCiudad}, ${lug.vlugPaisna}?`)) {
      this.loading = true;
      this.lugarService.delete(lug.vlugCodLug).subscribe({
        next: () => {
          this.loadLugares();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar lugar de nacimiento';
          this.loading = false;
        }
      });
    }
  }

  onSaveLugar(lugar: LugarNacimiento) {
    if (this.isEditing) {
      // Edición
      this.lugarService.updateLugarNacimiento(lugar).subscribe({
        next: () => {
          this.loadLugares();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al actualizar el lugar.'
      });
    } else {
      // Creación
      this.lugarService.createLugarNacimiento(lugar).subscribe({
        next: () => {
          this.loadLugares();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al crear el lugar.'
      });
    }
  }

  onCancelForm() {
    this.showForm = false;
    this.isEditing = false;
  }
} 