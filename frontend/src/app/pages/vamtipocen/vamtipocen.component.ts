import { Component, OnInit } from '@angular/core';
import { Vamtipocen } from '../../models/vamtipocen.interface';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vamtipocen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vamtipocen.component.html',
  styleUrls: ['./vamtipocen.component.css']
})
export class VamtipocenComponent implements OnInit {
  tipos: Vamtipocen[] = [];
  filteredTipos: Vamtipocen[] = [];
  searchTerm: string = '';
  loading = false;
  error = '';

  constructor(private tipoService: VamtipocenService, private router: Router) {}

  ngOnInit(): void {
    this.getTipos();
  }

  getTipos(): void {
    this.loading = true;
    this.tipoService.getAll().subscribe({
      next: (data) => {
        this.tipos = data;
        this.filtrarTipos();
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los tipos de centro';
        this.loading = false;
      }
    });
  }

  filtrarTipos(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTipos = this.tipos.slice();
      return;
    }
    this.filteredTipos = this.tipos.filter(tipo =>
      String(tipo.vtcecodtce).toLowerCase().includes(term) ||
      (tipo.vtcedescri && tipo.vtcedescri.toLowerCase().includes(term))
    );
  }

  nuevoTipo(): void {
    this.router.navigate(['/vamtipocen/crear']);
  }

  editarTipo(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/vamtipocen/editar', id]);
    }
  }

  eliminarTipo(id?: number): void {
    if (id !== undefined && confirm('¿Estás seguro de que deseas eliminar este tipo de centro?')) {
      this.loading = true;
      this.tipoService.delete(id).subscribe({
        next: () => {
          this.getTipos();
        },
        error: () => {
          this.error = 'Error al eliminar el tipo de centro';
          this.loading = false;
        }
      });
    }
  }

  verTipo(id: number): void {
    this.router.navigate(['/vamtipocen/detalle', id]);
  }
}

