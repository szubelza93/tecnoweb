import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoAlmacen } from '../../models/equipo-almacen.interface';
import { EquipoAlmacenService } from '../../services/equipo-almacen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipo-almacen-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipo-almacen-detail.component.html',
  styleUrls: ['./equipo-almacen-detail.component.css']
})
export class EquipoAlmacenDetailComponent implements OnInit {
  equipo?: EquipoAlmacen;
  loading = false;
  error = '';
  id?: number;

  constructor(
    private service: EquipoAlmacenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadEquipo();
    }
  }

  loadEquipo(): void {
    if (!this.id) return;
    this.loading = true;
    this.service.getById(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.equipo = response.data;
        } else {
          this.error = response.message || 'No se pudo cargar el equipo';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión al cargar el equipo';
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/equipos-almacen']);
  }
} 