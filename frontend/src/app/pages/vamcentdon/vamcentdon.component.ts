// Componente principal: listado de centros de donación
// Standalone Angular component (TypeScript skeleton)
import { Component, OnInit } from '@angular/core';
import { VamcentdonService, Vamcentdon } from '../../services/vamcentdon.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { Vamtipocen } from '../../models/vamtipocen.interface';

@Component({
  selector: 'app-vamcentdon',
  templateUrl: './vamcentdon.component.html',
  styleUrls: ['./vamcentdon.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VamcentdonComponent implements OnInit {
  centros: Vamcentdon[] = [];
  tiposCentro: Vamtipocen[] = [];
  loading = false;
  error = '';
  searchTerm = '';

  constructor(private service: VamcentdonService, private tipoService: VamtipocenService, private router: Router) {}

  ngOnInit() {
    this.cargarCentros();
    this.tipoService.getAll().subscribe({
      next: tipos => this.tiposCentro = tipos,
      error: () => this.error = 'No se pudieron cargar los tipos de centro'
    });
  }

  getNombreTipo(id: number): string {
    return this.tiposCentro.find(t => t.vtcecodtce === id)?.vtcedescri || id + '';
  }

  get centrosFiltrados(): Vamcentdon[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.centros;
    return this.centros.filter(c =>
      (c.vcencodcen + '').toLowerCase().includes(term) ||
      (c.vcennombre || '').toLowerCase().includes(term) ||
      (c.vcendirecc || '').toLowerCase().includes(term) ||
      (c.vcentelefo || '').toLowerCase().includes(term) ||
      (c.vtcecodtce + '').toLowerCase().includes(term)
    );
  }

  cargarCentros() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.centros = data; this.loading = false; },
      error: (err) => { this.error = 'Error al cargar centros'; this.loading = false; }
    });
  }

  crearCentro() { this.router.navigate(['/vamcentdon/crear']); }
  editarCentro(id: number) { this.router.navigate(['/vamcentdon/editar', id]); }
  verCentro(id: number) { this.router.navigate(['/vamcentdon/detalle', id]); }
  eliminarCentro(id: number) {
  if (!confirm('¿Seguro que deseas eliminar este centro?')) return;
  this.loading = true;
  this.service.delete(id).subscribe({
    next: () => {
      this.centros = this.centros.filter(c => c.vcencodcen !== id);
      this.loading = false;
    },
    error: () => {
      this.error = 'Error al eliminar el centro';
      this.loading = false;
    }
  });
}
}
