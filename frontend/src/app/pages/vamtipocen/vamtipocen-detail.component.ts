import { Component, OnInit } from '@angular/core';
import { Vamtipocen } from '../../models/vamtipocen.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VamtipocenService } from '../../services/vamtipocen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamtipocen-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vamtipocen-detail.component.html',
  styleUrls: ['./vamtipocen-detail.component.css']
})
export class VamtipocenDetailComponent implements OnInit {
  tipo: Vamtipocen | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: VamtipocenService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.tipoService.getById(+id).subscribe({
        next: (data) => {
          this.tipo = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar el tipo de centro';
          this.loading = false;
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/vamtipocen']);
  }
}
