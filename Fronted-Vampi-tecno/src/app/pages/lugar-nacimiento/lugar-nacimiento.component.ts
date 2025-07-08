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
    if (!this.searchTerm.trim()) {
      this.filteredLugares = [...this.lugares];
      this.totalItems = this.lugares.length;
      this.currentPage = 1;
      return;
    }
    this.filteredLugares = this.lugares.filter(lug =>
      lug.vlugciudad.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lug.vlugpaisna.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lug.vlugprovin.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    this.editLugarData = null;
    this.showForm = true;
  }

  editLugar(lug: LugarNacimiento): void {
    this.editLugarData = { ...lug };
    this.showForm = true;
  }

  deleteLugar(lug: LugarNacimiento): void {
    if (confirm(`¿Está seguro de eliminar el lugar ${lug.vlugciudad}, ${lug.vlugpaisna}?`)) {
      this.loading = true;
      this.lugarService.delete(lug.vlugcodlug).subscribe({
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
    if (this.editLugarData) {
      // Edición
      this.lugarService.updateLugarNacimiento(lugar).subscribe({
        next: () => {
          this.loadLugares();
          this.showForm = false;
        },
        error: err => this.error = 'Error al actualizar el lugar.'
      });
    } else {
      // Creación
      this.lugarService.createLugarNacimiento(lugar).subscribe({
        next: () => {
          this.loadLugares();
          this.showForm = false;
        },
        error: err => this.error = 'Error al crear el lugar.'
      });
    }
  }

  onCancelForm() {
    this.showForm = false;
  }
} 