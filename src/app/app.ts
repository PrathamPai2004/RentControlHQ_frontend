import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalNavbar } from './core/global-navbar/global-navbar';
import { TransitionOverlay } from './core/transition/transition-overlay';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalNavbar, TransitionOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
