import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DonanteService } from '../../services/donante.service';
import { Donante } from '../../models/donante.interface';

@Component({
  selector: 'app-donantes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './donantes.component.html',
  styleUrls: ['./donantes.component.css']
})
export class DonantesComponent implements OnInit {
  donantes: Donante[] = [];
  filteredDonantes: Donante[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private donanteService: DonanteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDonantes();
  }

  loadDonantes(): void {
    this.loading = true;
    this.error = '';
    
    this.donanteService.getAllDonantes().subscribe({
      next: (response) => {
        console.log('Respuesta en componente:', response);
        if (response.success) {
          this.donantes = response.data;
          console.log('Donantes cargados:', this.donantes);
          this.filteredDonantes = [...this.donantes];
          this.totalItems = this.donantes.length;
        } else {
          this.error = response.message || 'Error al cargar donantes';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.error = 'Error de conexión al cargar donantes';
        this.loading = false;
        console.error('Error loading donantes:', err);
      }
    });
  }

  searchDonantes(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDonantes = [...this.donantes];
      this.totalItems = this.donantes.length;
      this.currentPage = 1;
      return;
    }

    this.loading = true;
    this.donanteService.searchDonantesByNombre(this.searchTerm).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredDonantes = response.data;
          this.totalItems = this.filteredDonantes.length;
          this.currentPage = 1;
        } else {
          this.error = response.message || 'Error en la búsqueda';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión en la búsqueda';
        this.loading = false;
        console.error('Error searching donantes:', err);
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDonantes = [...this.donantes];
    this.totalItems = this.donantes.length;
    this.currentPage = 1;
  }

  // Paginación
  get paginatedDonantes(): Donante[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredDonantes.slice(startIndex, endIndex);
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

  // Acciones CRUD
  createDonante(): void {
    this.router.navigate(['/donantes/crear']);
  }

  editDonante(donante: Donante): void {
    this.router.navigate(['/donantes/editar', donante.vdonCodDon]);
  }

  viewDonante(donante: Donante): void {
    this.router.navigate(['/donantes/ver', donante.vdonCodDon]);
  }

  deleteDonante(donante: Donante): void {
    if (confirm(`¿Está seguro de eliminar al donante ${donante.vdonNombre} ${donante.vdonPatern}?`)) {
      this.loading = true;
      this.donanteService.deleteDonante(donante.vdonCodDon!).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadDonantes(); // Recargar la lista
          } else {
            this.error = response.message || 'Error al eliminar donante';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar donante';
          this.loading = false;
          console.error('Error deleting donante:', err);
        }
      });
    }
  }

  // Utilidades
  getFullName(donante: Donante): string {
    return `${donante.vdonNombre} ${donante.vdonPatern} ${donante.vdonMatern}`.trim();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }

  getEstadoCivilText(estado: string): string {
    const estados: { [key: string]: string } = {
      'S': 'Soltero',
      'C': 'Casado',
      'D': 'Divorciado',
      'V': 'Viudo'
    };
    return estados[estado] || estado;
  }

  getSexoText(sexo: string): string {
    return sexo === 'M' ? 'Masculino' : sexo === 'F' ? 'Femenino' : sexo;
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  getMax(a: number, b: number): number {
    return Math.max(a, b);
  }
} 