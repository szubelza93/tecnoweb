import { Component, OnInit } from '@angular/core';
import { Vamrefrige } from '../../models/vamrefrige.interface';
import { VamrefrigeService } from '../../services/vamrefrige.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vamrefrige',
  templateUrl: './vamrefrige.component.html',
  styleUrls: ['./vamrefrige.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VamrefrigeComponent implements OnInit {
  refrigeradores: Vamrefrige[] = [];
  filteredRefrigeradores: Vamrefrige[] = [];
  searchTerm = '';
  loading = false;
  error = '';

  constructor(
    private vamrefrigeService: VamrefrigeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRefrigeradores();
  }

  getRefrigeradores(): void {
    this.loading = true;
    this.vamrefrigeService.getAll().subscribe({
      next: (data) => {
        this.refrigeradores = data;
        this.filteredRefrigeradores = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los refrigeradores';
        this.loading = false;
      }
    });
  }

  nuevoRefrigerador(): void {
    this.router.navigate(['/vamrefrige/crear']);
  }

  editar(id: number) {
    this.router.navigate(['/vamrefrige/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que desea eliminar este refrigerador?')) {
      this.loading = true;
      this.vamrefrigeService.delete(id).subscribe(() => {
        this.getRefrigeradores();
      }, () => {
        this.error = 'Error al eliminar el refrigerador';
        this.loading = false;
      });
    }
  }

  buscarRefrigeradores(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRefrigeradores = this.refrigeradores.filter(r =>
      Object.values(r).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
  }

  verDetalle(id: number) {
    this.router.navigate(['/vamrefrige', id]);
  }
}

