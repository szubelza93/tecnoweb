import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuestionarioNumero } from '../../models/cuestionario-numero.interface';
import { CuestionarioNumeroService } from '../../services/cuestionario-numero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuestionario-numero-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuestionario-numero-detail.component.html',
  styleUrls: ['./cuestionario-numero-detail.component.css']
})
export class CuestionarioNumeroDetailComponent implements OnInit {
  cuestionario?: CuestionarioNumero;
  loading = false;
  error = '';
  id?: number;

  constructor(
    private service: CuestionarioNumeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadCuestionario();
    }
  }

  loadCuestionario(): void {
    if (!this.id) return;
    this.loading = true;
    this.service.getById(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.cuestionario = response.data;
        } else {
          this.error = response.message || 'No se pudo cargar el cuestionario';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión al cargar el cuestionario';
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/cuestionarios-numeros']);
  }
} 