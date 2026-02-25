import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-shell.html',
  styleUrl: './user-shell.css'
})
export class UserShell {
  userName: string = 'User';
  drawerOpen = false;

  navItems = [
    { label: 'Browse Towers', icon: '🏢', route: '/user/towers'      },
    { label: 'Browse Units',  icon: '🚪', route: '/user/units'       },
    { label: 'My Bookings',   icon: '📋', route: '/user/my-bookings' },
    { label: 'My Lease',      icon: '📄', route: '/user/my-lease'    },
  ];

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userName = decoded.name || decoded.email || 'User';
      } catch {
        this.userName = 'User';
      }
    }
  }

  // Keyboard shortcuts: 'i' to open, 'Escape' to close
  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    const inField = tag === 'input' || tag === 'textarea' || tag === 'select';
    if (e.key === 'Escape') { this.closeDrawer(); }
    if (e.key === 'i' && !inField) { this.openDrawer(); }
  }

  openDrawer()  { this.drawerOpen = true;  }
  closeDrawer() { this.drawerOpen = false; }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
