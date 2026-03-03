import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransitionService {
  private _active = new BehaviorSubject(false);
  active$ = this._active.asObservable();

  constructor(private router: Router) {}

  /** Call this instead of router.navigate(['/']) to show the animated transition */
  goHome() {
    if (this.router.url === '/') return; // Already home
    this._active.next(true);
    setTimeout(() => {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this._active.next(false), 400); // fade out after arrival
      });
    }, 2200); // Show for 2.2s then navigate
  }
}
