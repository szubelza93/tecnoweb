import { Component, OnInit } from '@angular/core';
import { EquipoAlmacen } from '../../models/equipo-almacen.interface';
import { EquipoAlmacenService } from '../../services/equipo-almacen.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos-almacen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './equipos-almacen.component.html',
  styleUrls: ['./equipos-almacen.component.css']
})
export class EquiposAlmacenComponent implements OnInit {
  equipos: EquipoAlmacen[] = [];
  filteredEquipos: EquipoAlmacen[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private equipoService: EquipoAlmacenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading = true;
    this.error = '';
    this.equipoService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.equipos = response.data;
          this.filteredEquipos = [...this.equipos];
          this.totalItems = this.equipos.length;
        } else {
          this.error = response.message || 'Error al cargar equipos';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar equipos';
        this.loading = false;
      }
    });
  }

  searchEquipos(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEquipos = [...this.equipos];
      this.totalItems = this.equipos.length;
      this.currentPage = 1;
      return;
    }
    this.loading = true;
    this.equipoService.searchByDescripcion(this.searchTerm).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredEquipos = response.data;
          this.totalItems = this.filteredEquipos.length;
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
    this.filteredEquipos = [...this.equipos];
    this.totalItems = this.equipos.length;
    this.currentPage = 1;
  }

  get paginatedEquipos(): EquipoAlmacen[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEquipos.slice(startIndex, endIndex);
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

  createEquipo(): void {
    this.router.navigate(['/equipos-almacen/crear']);
  }

  editEquipo(equipo: EquipoAlmacen): void {
    this.router.navigate(['/equipos-almacen/editar', equipo.vequcodequ]);
  }

  viewEquipo(equipo: EquipoAlmacen): void {
    this.router.navigate(['/equipos-almacen/ver', equipo.vequcodequ]);
  }

  deleteEquipo(equipo: EquipoAlmacen): void {
    if (confirm(`¿Está seguro de eliminar el equipo ${equipo.vequdescn}?`)) {
      this.loading = true;
      this.equipoService.delete(equipo.vequcodequ!).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadEquipos();
          } else {
            this.error = response.message || 'Error al eliminar equipo';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar equipo';
          this.loading = false;
        }
      });
    }
  }
} 