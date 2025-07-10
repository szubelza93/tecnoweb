import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {
  progress = 45;
  features = [
    {
      icon: 'check-circle',
      title: 'Gestión Avanzada',
      description: 'Herramientas completas para administrar todos los aspectos del sistema.',
      color: 'green'
    },
    {
      icon: 'lightning-bolt',
      title: 'Reportes en Tiempo Real',
      description: 'Genera reportes detallados y análisis estadísticos instantáneos.',
      color: 'purple'
    },
    {
      icon: 'shield-check',
      title: 'Seguridad Mejorada',
      description: 'Protección avanzada de datos y control de acceso granular.',
      color: 'orange'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Simular carga de datos solo en el navegador
      this.simulateProgress();
    }
  }

  private simulateProgress(): void {
    const interval = setInterval(() => {
      if (this.progress < 85) {
        this.progress += Math.random() * 5;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  }

  getProgressWidth(): string {
    return `${this.progress}%`;
  }
}
