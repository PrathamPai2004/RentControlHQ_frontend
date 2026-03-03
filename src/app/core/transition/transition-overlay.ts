import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TransitionService } from './transition.service';

@Component({
  selector: 'app-transition-overlay',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="transition-overlay" [class.active]="(transition.active$ | async)">
      <div class="transition-content">
        <div class="entrance-icon">🏠</div>
        <p class="entrance-line1">Wait while we're taking you</p>
        <p class="entrance-line2">to the entrance</p>
        <div class="dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .transition-overlay {
      position: fixed;
      inset: 0;
      background: #080c18;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .transition-overlay.active {
      opacity: 1;
      pointer-events: all;
    }

    .transition-content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .entrance-icon {
      font-size: 3.8rem;
      animation: float 1.6s ease-in-out infinite;
      margin-bottom: 8px;
      filter: drop-shadow(0 0 24px rgba(52,211,153,0.5));
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-14px) scale(1.08); }
    }

    .entrance-line1 {
      font-family: 'Inter', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: rgba(255,255,255,0.55);
      animation: fadeSlideUp 0.6s ease both;
    }

    .entrance-line2 {
      font-family: 'Inter', sans-serif;
      font-size: 1.7rem;
      font-weight: 800;
      background: linear-gradient(135deg, #34d399, #6ee7b7, #4f8ef7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fadeSlideUp 0.6s 0.15s ease both;
    }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dots {
      display: flex;
      gap: 7px;
      margin-top: 18px;
    }
    .dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34d399;
      animation: pulse 1.2s ease-in-out infinite;
    }
    .dots span:nth-child(2) { animation-delay: 0.2s; background: #6ee7b7; }
    .dots span:nth-child(3) { animation-delay: 0.4s; background: #4f8ef7; }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50%       { transform: scale(1.4); opacity: 1; }
    }
  `]
})
export class TransitionOverlay {
  constructor(public transition: TransitionService) {}
}
