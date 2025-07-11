import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VamGrupSanService } from '../../services/vamGrupSan.service';
import { VamGrupSan } from '../../models/vamGrupSan.interface';

@Component({
  selector: 'app-vam-grup-san-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vamGrupSan-detail.component.html',
  styleUrls: ['./vamGrupSan-detail.component.css']
})
export class VamGrupSanDetailComponent implements OnInit {
  vamGrupSan: VamGrupSan | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vamGrupSanService: VamGrupSanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.vamGrupSanService.getVamGrupSanById(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.vamGrupSan = response.data;
          } else {
            this.error = response.message || 'No se pudo cargar el grupo sanguíneo';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión al cargar grupo sanguíneo';
          this.loading = false;
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/vam-grup-san']);
  }
} 