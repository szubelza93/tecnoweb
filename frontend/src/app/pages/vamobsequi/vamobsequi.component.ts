import { Component, OnInit } from '@angular/core';
import { Vamobsequi } from '../../models/vamobsequi.interface';
import { VamobsequiService } from '../../services/vamobsequi.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vamobsequi',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './vamobsequi.component.html',
  styleUrls: ['./vamobsequi.component.css']
})
export class VamobsequiComponent implements OnInit {
  obsequios: Vamobsequi[] = [];
  filteredObsequios: Vamobsequi[] = [];
  searchTerm = '';
  loading = false;
  error = '';

  constructor(private vamobsequiService: VamobsequiService, private router: Router) {}

  ngOnInit(): void {
    this.getObsequios();
  }

  getObsequios(): void {
    this.loading = true;
    this.vamobsequiService.getAll().subscribe({
      next: (data) => {
        this.obsequios = data;
        this.filteredObsequios = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los obsequios';
        this.loading = false;
      }
    });
  }

  nuevoObsequio(): void {
    this.router.navigate(['/vamobsequi/crear']);
  }

  editarObsequio(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/vamobsequi/editar', id]);
    }
  }

  eliminarObsequio(id?: number): void {
    if (id !== undefined && confirm('¿Estás seguro de que deseas eliminar este obsequio?')) {
      this.loading = true;
      this.vamobsequiService.delete(id).subscribe({
        next: () => {
          this.getObsequios();
        },
        error: () => {
          this.error = 'Error al eliminar el obsequio';
          this.loading = false;
        }
      });
    }
  }

  buscarObsequios(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredObsequios = this.obsequios.filter(o =>
      Object.values(o).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
  }

  verObsequio(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/vamobsequi/ver', id]);
    }
  }
} 