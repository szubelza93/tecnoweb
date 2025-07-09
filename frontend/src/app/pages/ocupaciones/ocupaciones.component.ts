import { Component, OnInit } from '@angular/core';
import { OcupacionService } from '../../services/ocupacion.service';
import { Ocupacion } from '../../models/ocupacion.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocupaciones',
  templateUrl: './ocupaciones.component.html',
  styleUrls: ['./ocupaciones.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OcupacionesComponent implements OnInit {
  ocupaciones: Ocupacion[] = [];
  filteredOcupaciones: Ocupacion[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private ocupacionService: OcupacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOcupaciones();
  }

  loadOcupaciones(): void {
    this.loading = true;
    this.error = '';
    this.ocupacionService.getAll().subscribe({
      next: (ocupaciones) => {
        this.ocupaciones = ocupaciones;
        this.filteredOcupaciones = [...this.ocupaciones];
        this.totalItems = this.ocupaciones.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar ocupaciones';
        this.loading = false;
      }
    });
  }

  searchOcupaciones(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOcupaciones = [...this.ocupaciones];
      this.totalItems = this.ocupaciones.length;
      this.currentPage = 1;
      return;
    }
    this.filteredOcupaciones = this.ocupaciones.filter(ocu =>
      ocu.vocudescri.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredOcupaciones.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredOcupaciones = [...this.ocupaciones];
    this.totalItems = this.ocupaciones.length;
    this.currentPage = 1;
  }

  get paginatedOcupaciones(): Ocupacion[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOcupaciones.slice(startIndex, endIndex);
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

  createOcupacion(): void {
    this.router.navigate(['/ocupaciones/crear']);
  }

  editOcupacion(ocu: Ocupacion): void {
    this.router.navigate(['/ocupaciones/editar', ocu.vocucodocu]);
  }

  deleteOcupacion(ocu: Ocupacion): void {
    if (confirm(`¿Está seguro de eliminar la ocupación ${ocu.vocudescri}?`)) {
      this.loading = true;
      this.ocupacionService.delete(ocu.vocucodocu).subscribe({
        next: () => {
          this.loadOcupaciones();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar ocupación';
          this.loading = false;
        }
      });
    }
  }
} 