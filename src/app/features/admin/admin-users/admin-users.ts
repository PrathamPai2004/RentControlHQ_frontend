import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrls: ['../towers/towers.css', './admin-users.css']
})
export class AdminUsers implements OnInit {
  users: any[] = [];
  bookings: any[] = [];
  leases: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  expandedUserId: number | null = null;
  private toastTimer: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { this.error = 'Not authorized.'; this.loading = false; return; }
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    let done = 0;
    const check = () => { if (++done === 3) { this.loading = false; this.cdr.detectChanges(); } };

    this.http.get<any[]>('http://127.0.0.1:5000/auth/users', { headers: this.headers }).subscribe({
      next: (d) => { this.users = d; check(); },
      error: (e) => { this.error = e.error?.error || 'Failed to load users'; check(); }
    });

    this.http.get<any[]>('http://127.0.0.1:5000/bookings/get-bookings', { headers: this.headers }).subscribe({
      next: (d) => { this.bookings = d; check(); },
      error: () => check()
    });

    this.http.get<any[]>('http://127.0.0.1:5000/leases/get-leases', { headers: this.headers }).subscribe({
      next: (d) => { this.leases = d; check(); },
      error: () => check()
    });
  }

  toggleUser(id: number) {
    this.expandedUserId = this.expandedUserId === id ? null : id;
    this.cdr.detectChanges();
  }

  bookingsFor(userId: number) { return this.bookings.filter(b => b.user_id === userId); }
  leasesFor(userId: number) { return this.leases.filter(l => l.user_id === userId); }

  private showToast(msg: string) {
    this.actionMsg = msg;
    this.cdr.detectChanges();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.actionMsg = ''; this.cdr.detectChanges(); }, 3000);
  }

  approve(bookingId: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${bookingId}/approve`, {}, { headers: this.headers }).subscribe({
      next: () => { this.showToast(`✓ Booking #${bookingId} approved`); this.loadAll(); },
      error: (e) => { this.showToast(e.error?.error || 'Approval failed'); }
    });
  }

  reject(bookingId: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${bookingId}/reject-booking`, {}, { headers: this.headers }).subscribe({
      next: () => { this.showToast(`✗ Booking #${bookingId} rejected`); this.loadAll(); },
      error: (e) => { this.showToast(e.error?.error || 'Rejection failed'); }
    });
  }
}
