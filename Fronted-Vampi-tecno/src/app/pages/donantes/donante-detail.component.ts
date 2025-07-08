import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DonanteService } from '../../services/donante.service';
import { Donante } from '../../models/donante.interface';

@Component({
  selector: 'app-donante-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donante-detail.component.html',
  styleUrls: ['./donante-detail.component.css']
})
export class DonanteDetailComponent implements OnInit {
  donante: Donante | null = null;
  loading = false;
  error = '';

  constructor(
    private donanteService: DonanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDonante();
  }

  private loadDonante(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID de donante no válido';
      return;
    }

    this.loading = true;
    this.error = '';

    this.donanteService.getDonanteById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.donante = response.data;
        } else {
          this.error = response.message || 'Error al cargar el donante';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión al cargar el donante';
        this.loading = false;
        console.error('Error loading donante:', err);
      }
    });
  }

  onEdit(): void {
    if (this.donante?.vdonCodDon) {
      this.router.navigate(['/donantes/editar', this.donante.vdonCodDon]);
    }
  }

  onBack(): void {
    this.router.navigate(['/donantes']);
  }

  onDelete(): void {
    if (!this.donante?.vdonCodDon) return;

    if (confirm(`¿Está seguro de eliminar al donante ${this.getFullName(this.donante)}?`)) {
      this.loading = true;
      this.donanteService.deleteDonante(this.donante.vdonCodDon).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/donantes']);
          } else {
            this.error = response.message || 'Error al eliminar el donante';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al eliminar el donante';
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
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  getEstadoText(activo: boolean): string {
    return activo ? 'Activo' : 'Inactivo';
  }

  getEstadoClass(activo: boolean): string {
    return activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  hasValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
} 