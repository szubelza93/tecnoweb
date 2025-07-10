import { Component, OnInit } from '@angular/core';
import { Vamrefrige } from '../../models/vamrefrige.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VamrefrigeService } from '../../services/vamrefrige.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamrefrige-detail',
  templateUrl: './vamrefrige-detail.component.html',
  styleUrls: ['./vamrefrige-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VamrefrigeDetailComponent implements OnInit {
  refrige: Vamrefrige | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private vamrefrigeService: VamrefrigeService,
    private router: Router
  ) {}

  volver() {
    this.router.navigate(['/vamrefrige']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.vamrefrigeService.getById(+id).subscribe({
        next: (data) => {
          this.refrige = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar el refrigerador';
          this.loading = false;
        }
      });
    }
  }
}
