import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VamcuestioService, VamCuestio, VamCuesNro } from '../../services/vamcuestio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vamcuestio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vamcuestio.component.html',
  styleUrls: ['./vamcuestio.component.css']
})
export class VamcuestioComponent implements OnInit {
  cuestionarios: VamCuestio[] = [];
  filteredCuestionarios: VamCuestio[] = [];
  cuesNro: VamCuesNro[] = [];
  searchTerm = '';
  loading = false;
  error = '';

  constructor(private service: VamcuestioService, private router: Router) {}

  ngOnInit() {
    this.getCuestionarios();
    this.service.getCuesNro().subscribe({
      next: data => this.cuesNro = data,
      error: () => this.error = 'Error al cargar los nombres de cuestionarios'
    });
  }

  getCuestionarios() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => {
        this.cuestionarios = data;
        this.filteredCuestionarios = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error al cargar los cuestionarios';
        this.loading = false;
      }
    });
  }

  filtrarCuestionarios() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCuestionarios = this.cuestionarios.filter(c =>
      c.vcuepregun.toLowerCase().includes(term) ||
      (c.vcuenrocue + '').includes(term)
    );
  }

  getNombreCuestionario(id: number): string {
    return this.cuesNro.find(n => n.vcuenrocue === id)?.vcuedescri || id + '';
  }

  crearCuestionario() {
    this.router.navigate(['/vamcuestio/crear']);
  }

  editarCuestionario(id: number) {
    this.router.navigate(['/vamcuestio/editar', id]);
  }

  verCuestionario(id: number) {
    this.router.navigate(['/vamcuestio/detalle', id]);
  }

  eliminarCuestionario(id?: number) {
    if (id !== undefined && confirm('¿Estás seguro de que deseas eliminar esta pregunta del cuestionario?')) {
      this.loading = true;
      this.service.delete(id).subscribe({
        next: () => this.getCuestionarios(),
        error: () => {
          this.error = 'Error al eliminar la pregunta';
          this.loading = false;
        }
      });
    }
  }
}
