import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VamGrupSanService } from '../../services/vamGrupSan.service';
import { VamGrupSan } from '../../models/vamGrupSan.interface';

@Component({
  selector: 'app-vam-grup-san',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vamGrupSan.component.html',
  styleUrls: ['./vamGrupSan.component.css']
})
export class VamGrupSanComponent implements OnInit {
  vamGrupSanList: VamGrupSan[] = [];
  filteredVamGrupSan: VamGrupSan[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private vamGrupSanService: VamGrupSanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVamGrupSan();
  }

  loadVamGrupSan(): void {
    this.loading = true;
    this.error = '';
    
    this.vamGrupSanService.getAllVamGrupSan().subscribe({
      next: (response) => {
        console.log('Respuesta en componente:', response);
        if (response.success) {
          this.vamGrupSanList = response.data;
          console.log('VamGrupSan cargados:', this.vamGrupSanList);
          this.filteredVamGrupSan = [...this.vamGrupSanList];
          this.totalItems = this.vamGrupSanList.length;
        } else {
          this.error = response.message || 'Error al cargar grupos sanguíneos';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.error = 'Error de conexión al cargar grupos sanguíneos';
        this.loading = false;
        console.error('Error loading vamGrupSan:', err);
      }
    });
  }

  searchVamGrupSan(): void {
    if (!this.searchTerm.trim()) {
      this.filteredVamGrupSan = [...this.vamGrupSanList];
      this.totalItems = this.vamGrupSanList.length;
      this.currentPage = 1;
      return;
    }

    this.loading = true;
    this.vamGrupSanService.searchVamGrupSanByGruABO(this.searchTerm).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredVamGrupSan = response.data;
          this.totalItems = this.filteredVamGrupSan.length;
          this.currentPage = 1;
        } else {
          this.error = response.message || 'Error en la búsqueda';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión en la búsqueda';
        this.loading = false;
        console.error('Error searching vamGrupSan:', err);
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredVamGrupSan = [...this.vamGrupSanList];
    this.totalItems = this.vamGrupSanList.length;
    this.currentPage = 1;
  }

  // Paginación
  get paginatedVamGrupSan(): VamGrupSan[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVamGrupSan.slice(startIndex, endIndex);
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
  createVamGrupSan(): void {
    this.router.navigate(['/vam-grup-san/crear']);
  }

  editVamGrupSan(vamGrupSan: VamGrupSan): void {
    this.router.navigate(['/vam-grup-san/editar', vamGrupSan.vqrsCodGrs]);
  }

  viewVamGrupSan(vamGrupSan: VamGrupSan): void {
    this.router.navigate(['/vam-grup-san/ver', vamGrupSan.vqrsCodGrs]);
  }

  deleteVamGrupSan(vamGrupSan: VamGrupSan): void {
    if (confirm(`¿Está seguro de eliminar el grupo sanguíneo ${vamGrupSan.vqrsGruABO} ${vamGrupSan.vqrsTipoRH}?`)) {
      this.loading = true;
      this.vamGrupSanService.deleteVamGrupSan(vamGrupSan.vqrsCodGrs!).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadVamGrupSan(); // Recargar la lista
          } else {
            this.error = response.message || 'Error al eliminar grupo sanguíneo';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar grupo sanguíneo';
          this.loading = false;
          console.error('Error deleting vamGrupSan:', err);
        }
      });
    }
  }

  // Utilidades
  getGrupoSanguineoCompleto(vamGrupSan: VamGrupSan): string {
    return `${vamGrupSan.vqrsGruABO} ${vamGrupSan.vqrsTipoRH}`;
  }

  getTipoRHText(tipoRH: string): string {
    return tipoRH === '+' ? 'Positivo' : tipoRH === '-' ? 'Negativo' : tipoRH;
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  getMax(a: number, b: number): number {
    return Math.max(a, b);
  }
} 