import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VamTipoDonService } from '../../services/vamTipoDon.service';
import { VamTipoDon } from '../../models/vamTipoDon.interface';

@Component({
  selector: 'app-vam-tipo-don',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vamTipoDon.component.html',
  styleUrls: ['./vamTipoDon.component.css']
})
export class VamTipoDonComponent implements OnInit {
  vamTipoDonList: VamTipoDon[] = [];
  filteredVamTipoDon: VamTipoDon[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private vamTipoDonService: VamTipoDonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVamTipoDon();
  }

  loadVamTipoDon(): void {
    this.loading = true;
    this.error = '';
    
    this.vamTipoDonService.getAllVamTipoDon().subscribe({
      next: (response) => {
        if (response.success) {
          this.vamTipoDonList = response.data;
          this.filteredVamTipoDon = [...this.vamTipoDonList];
          this.totalItems = this.vamTipoDonList.length;
        } else {
          this.error = response.message || 'Error al cargar tipos de donación';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar tipos de donación';
        this.loading = false;
      }
    });
  }

  searchVamTipoDon(): void {
    if (!this.searchTerm.trim()) {
      this.filteredVamTipoDon = [...this.vamTipoDonList];
      this.totalItems = this.vamTipoDonList.length;
      this.currentPage = 1;
      return;
    }

    this.loading = true;
    this.vamTipoDonService.searchVamTipoDonByDescn(this.searchTerm).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredVamTipoDon = response.data;
          this.totalItems = this.filteredVamTipoDon.length;
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
    this.filteredVamTipoDon = [...this.vamTipoDonList];
    this.totalItems = this.vamTipoDonList.length;
    this.currentPage = 1;
  }

  // Paginación
  get paginatedVamTipoDon(): VamTipoDon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVamTipoDon.slice(startIndex, endIndex);
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
  createVamTipoDon(): void {
    this.router.navigate(['/vam-tipo-don/crear']);
  }

  editVamTipoDon(tipoDon: VamTipoDon): void {
    this.router.navigate(['/vam-tipo-don/editar', tipoDon.vtdnCodTdn]);
  }

  deleteVamTipoDon(tipoDon: VamTipoDon): void {
    if (confirm(`¿Está seguro de eliminar el tipo de donación "${tipoDon.vtdnDescn}"?`)) {
      this.loading = true;
      this.vamTipoDonService.deleteVamTipoDon(tipoDon.vtdnCodTdn).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadVamTipoDon();
          } else {
            this.error = response.message || 'Error al eliminar tipo de donación';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar tipo de donación';
          this.loading = false;
        }
      });
    }
  }
} 