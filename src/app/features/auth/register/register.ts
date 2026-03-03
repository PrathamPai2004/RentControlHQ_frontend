import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  formData = { name: '', email: '', password: '' };

  message  = '';
  errorMsg = '';
  loading  = false;
  success  = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private zone: NgZone
  ) {}

  register() {
    this.message  = '';
    this.errorMsg = '';
    this.loading  = true;

    this.auth.register(this.formData).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.loading = false;
          this.success = true;
          this.message = res?.message || 'Account created! Please check your email to verify.';
          // Brief pause so user sees the success state, then redirect
          setTimeout(() => this.router.navigate(['/auth/verify-email']), 1500);
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.loading  = false;
          this.errorMsg = err.error?.error || err.error?.message || 'Registration failed. Try again.';
        });
      }
    });
  }
}