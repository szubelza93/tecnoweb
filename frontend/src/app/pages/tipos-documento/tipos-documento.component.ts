import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../models/tipo-documento.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipos-documento',
  templateUrl: './tipos-documento.component.html',
  styleUrls: ['./tipos-documento.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TiposDocumentoComponent implements OnInit {
  tiposDocumento: TipoDocumento[] = [];
  filteredTipos: TipoDocumento[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTiposDocumento();
  }

  loadTiposDocumento(): void {
    this.loading = true;
    this.error = '';
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
        this.filteredTipos = [...this.tiposDocumento];
        this.totalItems = this.tiposDocumento.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar tipos de documento';
        this.loading = false;
      }
    });
  }

  searchTiposDocumento(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTipos = [...this.tiposDocumento];
      this.totalItems = this.tiposDocumento.length;
      this.currentPage = 1;
      return;
    }
    this.filteredTipos = this.tiposDocumento.filter(tipo =>
      tipo.vtidDescr.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredTipos.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredTipos = [...this.tiposDocumento];
    this.totalItems = this.tiposDocumento.length;
    this.currentPage = 1;
  }

  get paginatedTipos(): TipoDocumento[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTipos.slice(startIndex, endIndex);
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

  createTipoDocumento(): void {
    this.router.navigate(['/tipos-documento/crear']);
  }

  editTipoDocumento(tipo: TipoDocumento): void {
    this.router.navigate(['/tipos-documento/editar', tipo.vtidCodTid]);
  }

  deleteTipoDocumento(tipo: TipoDocumento): void {
    if (confirm(`¿Está seguro de eliminar el tipo de documento ${tipo.vtidDescr}?`)) {
      this.loading = true;
      this.tipoDocumentoService.delete(tipo.vtidCodTid).subscribe({
        next: () => {
          this.loadTiposDocumento();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar tipo de documento';
          this.loading = false;
        }
      });
    }
  }
} 