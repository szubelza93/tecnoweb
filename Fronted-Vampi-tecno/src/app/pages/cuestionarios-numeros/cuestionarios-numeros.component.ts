import { Component, OnInit } from '@angular/core';
import { CuestionarioNumero } from '../../models/cuestionario-numero.interface';
import { CuestionarioNumeroService } from '../../services/cuestionario-numero.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuestionarios-numeros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cuestionarios-numeros.component.html',
  styleUrls: ['./cuestionarios-numeros.component.css']
})
export class CuestionariosNumerosComponent implements OnInit {
  cuestionarios: CuestionarioNumero[] = [];
  filteredCuestionarios: CuestionarioNumero[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private cuestionarioService: CuestionarioNumeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCuestionarios();
  }

  loadCuestionarios(): void {
    this.loading = true;
    this.error = '';
    this.cuestionarioService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.cuestionarios = response.data;
          this.filteredCuestionarios = [...this.cuestionarios];
          this.totalItems = this.cuestionarios.length;
        } else {
          this.error = response.message || 'Error al cargar cuestionarios';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar cuestionarios';
        this.loading = false;
      }
    });
  }

  searchCuestionarios(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCuestionarios = [...this.cuestionarios];
      this.totalItems = this.cuestionarios.length;
      this.currentPage = 1;
      return;
    }
    this.loading = true;
    this.cuestionarioService.searchByDescripcion(this.searchTerm).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredCuestionarios = response.data;
          this.totalItems = this.filteredCuestionarios.length;
          this.currentPage = 1;
        } else {
          this.error = response.message || 'Error en la búsqueda';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión en la búsqueda';
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredCuestionarios = [...this.cuestionarios];
    this.totalItems = this.cuestionarios.length;
    this.currentPage = 1;
  }

  get paginatedCuestionarios(): CuestionarioNumero[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCuestionarios.slice(startIndex, endIndex);
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

  createCuestionario(): void {
    this.router.navigate(['/cuestionarios-numeros/crear']);
  }

  editCuestionario(cuestionario: CuestionarioNumero): void {
    this.router.navigate(['/cuestionarios-numeros/editar', cuestionario.vcueNroCue]);
  }

  viewCuestionario(cuestionario: CuestionarioNumero): void {
    this.router.navigate(['/cuestionarios-numeros/ver', cuestionario.vcueNroCue]);
  }

  deleteCuestionario(cuestionario: CuestionarioNumero): void {
    if (confirm(`¿Está seguro de eliminar el cuestionario número ${cuestionario.vcueNroCue}?`)) {
      this.loading = true;
      this.cuestionarioService.delete(cuestionario.vcueNroCue).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadCuestionarios();
          } else {
            this.error = response.message || 'Error al eliminar cuestionario';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar cuestionario';
          this.loading = false;
        }
      });
    }
  }
} 