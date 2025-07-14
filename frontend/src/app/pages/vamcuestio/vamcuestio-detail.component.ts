import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VamcuestioService, VamCuestio, VamCuesNro } from '../../services/vamcuestio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vamcuestio-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vamcuestio-detail.component.html',
  styleUrls: ['./vamcuestio-detail.component.css']
})
export class VamcuestioDetailComponent implements OnInit {
  cuestionario?: VamCuestio;
  cuesNro: VamCuesNro[] = [];
  loading = false;
  error = '';

  constructor(private service: VamcuestioService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.service.getCuesNro().subscribe({
      next: data => this.cuesNro = data,
      error: () => this.error = 'Error al cargar los nombres de cuestionarios'
    });
    this.service.getById(+id).subscribe({
      next: data => {
        this.cuestionario = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar el detalle';
        this.loading = false;
      }
    });
  }

  getNombreCuestionario(id: number): string {
    return this.cuesNro.find(n => n.vcuenrocue === id)?.vcuedescri || id + '';
  }

  volver() {
    this.router.navigate(['/vamcuestio']);
  }
}
