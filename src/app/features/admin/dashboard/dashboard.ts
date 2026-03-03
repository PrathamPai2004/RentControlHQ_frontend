import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  adminName: string = 'Admin';
  sidebarCollapsed = false;
  currentPageTitle = 'Towers';
  currentTime = '';
  private clockInterval: any;

  navItems = [
    { label: 'Towers',   icon: '🏢', route: '/admin/towers',   badge: '' },
    { label: 'Units',    icon: '🚪', route: '/admin/units',    badge: '' },
    { label: 'Bookings', icon: '📋', route: '/admin/bookings', badge: '' },
    { label: 'Leases',   icon: '📄', route: '/admin/leases',   badge: '' },
    { label: 'Users',    icon: '👥', route: '/admin/users',    badge: '' },
  ];

  private routeTitleMap: Record<string, string> = {
    '/admin/towers':   'Towers',
    '/admin/units':    'Units',
    '/admin/bookings': 'Bookings',
    '/admin/leases':   'Leases',
    '/admin/users':    'Users',
  };

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.adminName = decoded.name || decoded.email || 'Admin';
      } catch {
        this.adminName = 'Admin';
      }
    }
  }

  ngOnInit() {
    this.updateTime();
    this.clockInterval = setInterval(() => this.updateTime(), 1000);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const path = e.urlAfterRedirects.split('?')[0];
      this.currentPageTitle = this.routeTitleMap[path] || 'Dashboard';
    });

    // Set initial page title
    const currentPath = this.router.url.split('?')[0];
    this.currentPageTitle = this.routeTitleMap[currentPath] || 'Dashboard';
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
