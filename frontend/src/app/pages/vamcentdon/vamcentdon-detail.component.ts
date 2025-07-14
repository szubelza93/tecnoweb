// Componente standalone para mostrar detalle de centro de donante
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VamcentdonService, Vamcentdon } from '../../services/vamcentdon.service';

import { CommonModule } from '@angular/common';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { Vamtipocen } from '../../models/vamtipocen.interface';

@Component({
  selector: 'app-vamcentdon-detail',
  templateUrl: './vamcentdon-detail.component.html',
  styleUrls: ['./vamcentdon-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VamcentdonDetailComponent implements OnInit {
  centro: Vamcentdon | null = null;
  tiposCentro: Vamtipocen[] = [];
  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: VamcentdonService,
    private tipoService: VamtipocenService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tipoService.getAll().subscribe({
      next: tipos => this.tiposCentro = tipos,
      error: () => this.error = 'No se pudieron cargar los tipos de centro'
    });
    if (id) {
      this.loading = true;
      this.service.getById(id).subscribe({
        next: (data) => { this.centro = data; this.loading = false; },
        error: () => { this.error = 'No se pudo cargar el centro.'; this.loading = false; }
      });
    }
  }

  getNombreTipo(id: number): string {
    return this.tiposCentro.find(t => t.vtcecodtce === id)?.vtcedescri || id + '';
  }

  volver() { this.router.navigate(['/vamcentdon']); }
}
