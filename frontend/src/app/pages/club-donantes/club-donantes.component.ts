import { Component, OnInit } from '@angular/core';
import { ClubDonantesService } from '../../services/club-donantes.service';
import { ClubDonantes } from '../../models/club-donantes.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClubDonantesFormComponent } from './club-donantes-form.component';

@Component({
  selector: 'app-club-donantes',
  templateUrl: './club-donantes.component.html',
  styleUrls: ['./club-donantes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ClubDonantesFormComponent]
})
export class ClubDonantesComponent implements OnInit {
  clubes: ClubDonantes[] = [];
  filteredClubes: ClubDonantes[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  showForm = false;
  editClubData: ClubDonantes | null = null;
  isEditing = false;

  constructor(
    private clubService: ClubDonantesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClubes();
  }

  loadClubes(): void {
    this.loading = true;
    this.error = '';
    this.clubService.getAll().subscribe({
      next: (clubes) => {
        this.clubes = clubes;
        this.filteredClubes = [...this.clubes];
        this.totalItems = this.clubes.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar clubes de donantes';
        this.loading = false;
      }
    });
  }

  searchClubes(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClubes = [...this.clubes];
      this.totalItems = this.clubes.length;
      this.currentPage = 1;
      return;
    }
    this.filteredClubes = this.clubes.filter(club =>
      club.vcluDescri.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (club.vcluDirecc && club.vcluDirecc.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (club.vcluRepRes && club.vcluRepRes.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.totalItems = this.filteredClubes.length;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredClubes = [...this.clubes];
    this.totalItems = this.clubes.length;
    this.currentPage = 1;
  }

  get paginatedClubes(): ClubDonantes[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredClubes.slice(startIndex, endIndex);
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

  createClub(): void {
    // Generar el siguiente código disponible
    const maxCode = this.clubes.length > 0 
      ? Math.max(...this.clubes.map(c => c.vcluCodClu))
      : 0;
    const nextCode = maxCode + 1;
    
    this.editClubData = {
      vcluCodClu: nextCode,
      vcluDescri: '',
      vcluDirecc: '',
      vcluTelefo: '',
      vcluRepRes: ''
    };
    this.isEditing = false;
    this.showForm = true;
  }

  editClub(club: ClubDonantes): void {
    this.editClubData = { ...club };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteClub(club: ClubDonantes): void {
    if (confirm(`¿Está seguro de eliminar el club ${club.vcluDescri}?`)) {
      this.loading = true;
      this.clubService.delete(club.vcluCodClu).subscribe({
        next: () => {
          this.loadClubes();
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al eliminar club de donantes';
          this.loading = false;
        }
      });
    }
  }

  onSaveClub(club: ClubDonantes) {
    if (this.isEditing) {
      // Edición
      this.clubService.updateClubDonantes(club).subscribe({
        next: () => {
          this.loadClubes();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al actualizar el club.'
      });
    } else {
      // Creación
      this.clubService.createClubDonantes(club).subscribe({
        next: () => {
          this.loadClubes();
          this.showForm = false;
          this.isEditing = false;
        },
        error: err => this.error = 'Error al crear el club.'
      });
    }
  }

  onCancelForm() {
    this.showForm = false;
    this.isEditing = false;
  }
} 