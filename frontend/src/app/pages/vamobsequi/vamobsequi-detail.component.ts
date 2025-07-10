import { Component, OnInit } from '@angular/core';
import { Vamobsequi } from '../../models/vamobsequi.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VamobsequiService } from '../../services/vamobsequi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamobsequi-detail',
  templateUrl: './vamobsequi-detail.component.html',
  styleUrls: ['./vamobsequi-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VamobsequiDetailComponent implements OnInit {
  obsequio: Vamobsequi | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vamobsequiService: VamobsequiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.vamobsequiService.getById(+id).subscribe({
        next: (data) => {
          this.obsequio = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar el obsequio';
          this.loading = false;
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/vamobsequi']);
  }
} 