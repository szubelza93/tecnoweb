import { Component, OnInit } from '@angular/core';
import { ZonaDireccionService } from '../../services/zona-direccion.service';
import { ZonaDireccion } from '../../models/zona-direccion.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZonaDireccionFormComponent } from './zona-direccion-form.component';

@Component({
  selector: 'app-zona-direccion',
  templateUrl: './zona-direccion.component.html',
  styleUrls: ['./zona-direccion.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ZonaDireccionFormComponent]
})
export class ZonaDireccionComponent implements OnInit {
  zonas: ZonaDireccion[] = [];
  filteredZonas: ZonaDireccion[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  showForm = false;
  editZonaData: ZonaDireccion | null = null;
  isEditing = false;

  constructor(
    private zonaService: ZonaDireccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadZonas();
  }

  loadZonas(): void {
    this.loading = true;
    this.error = '';
    this.zonaService.getAll().subscribe({
      next: (zonas) => {
        this.zonas = zonas;
        this.filteredZonas = [...this.zonas];
        this.totalItems = this.zonas.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar zonas de dirección';
        this.loading = false;
      }
    });
  }

  searchZonas(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredZonas = [...this.zonas];
      this.totalItems = this.zonas.length;
      this.currentPage = 1;
      return;
    }
    this.filteredZonas = this.zonas.filter(zona =>
      Object.values(zona).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
    this.totalItems = this.filteredZonas.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredZonas = [...this.zonas];
    this.totalItems = this.zonas.length;
    this.currentPage = 1;
  }

  get paginatedZonas(): ZonaDireccion[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredZonas.slice(startIndex, endIndex);
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

  createZona(): void {
    // Generar el siguiente código disponible
    const maxCode = this.zonas.length > 0 
      ? Math.max(...this.zonas.map(z => z.vzonCodZon))
      : 0;
    const nextCode = maxCode + 1;
    
    this.editZonaData = {
      vzonCodZon: nextCode,
      vlugCodLug: 0,
      vzonDescr: ''
    };
    this.isEditing = false;
    this.showForm = true;
  }

  editZona(zona: ZonaDireccion): void {
    this.editZonaData = { ...zona };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteZona(zona: ZonaDireccion): void {
    if (confirm(`¿Está seguro de eliminar la zona ${zona.vzonDescr}?`)) {
      this.loading = true;
      this.zonaService.delete(zona.vzonCodZon).subscribe({
        next: () => {
          this.loadZonas();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar zona de dirección';
          this.loading = false;
        }
      });
    }
  }

  onSaveZona(zona: ZonaDireccion) {
    if (this.isEditing) {
      this.zonaService.update(zona.vzonCodZon, zona).subscribe({
        next: () => {
          this.loadZonas();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al actualizar la zona.'
      });
    } else {
      this.zonaService.create(zona).subscribe({
        next: () => {
          this.loadZonas();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al crear la zona.'
      });
    }
  }

  onCancelForm() {
    this.showForm = false;
    this.isEditing = false;
  }
} 