import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  adminName: string = 'Admin';

  navItems = [
    { label: 'Towers',   icon: '🏢', route: '/admin/towers'   },
    { label: 'Units',    icon: '🚪', route: '/admin/units'    },
    { label: 'Bookings', icon: '📋', route: '/admin/bookings' },
    { label: 'Leases',   icon: '📄', route: '/admin/leases'   },
    { label: 'Users',    icon: '👥', route: '/admin/users'    },
  ];

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Flask-JWT-Extended puts additional_claims at the top level of the payload
        this.adminName = decoded.name || decoded.email || 'Admin';
      } catch {
        this.adminName = 'Admin';
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
