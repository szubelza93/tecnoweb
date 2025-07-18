import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, CommonModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isUserMenuOpen = false;
  isScreeningMenuOpen = false;
  isConfigMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleScreeningMenu() {
    this.isScreeningMenuOpen = !this.isScreeningMenuOpen;
  }

  toggleConfigMenu() {
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }
}
