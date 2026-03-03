import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TransitionService } from '../transition/transition.service';

@Component({
  selector: 'app-global-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './global-navbar.html',
  styleUrl: './global-navbar.css'
})
export class GlobalNavbar {
  isHome = true;
  // On admin/user pages, make it minimal (just a Home button)
  compact = false;

  constructor(private router: Router, public transition: TransitionService) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const url: string = e.urlAfterRedirects || e.url;
      this.isHome  = url === '/';
      this.compact = url.startsWith('/admin') || url.startsWith('/user');
    });
  }

  goHome() {
    this.transition.goHome();
  }
}
