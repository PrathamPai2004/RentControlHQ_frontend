import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['../towers/towers.css', './bookings.css']
})
export class Bookings implements OnInit {
  bookings: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  private toastTimer: any;

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  get pendingCount(): number { return this.bookings.filter(b => b.status === 'pending').length; }
  get approvedCount(): number { return this.bookings.filter(b => b.status === 'approved').length; }
  get rejectedCount(): number { return this.bookings.filter(b => b.status === 'rejected').length; }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.loadBookings(); }

  loadBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No auth token found. Please log in again.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.loading = true;
    this.error = '';
    this.http.get<any[]>('http://127.0.0.1:5000/bookings/get-bookings', { headers: this.headers }).subscribe({
      next: (data) => { this.bookings = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => {
        this.error = err.error?.msg || err.error?.error || `Error ${err.status}: Failed to load bookings`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private showToast(msg: string) {
    this.actionMsg = msg;
    this.cdr.detectChanges();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.actionMsg = ''; this.cdr.detectChanges(); }, 3000);
  }

  approve(id: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${id}/approve`, {}, { headers: this.headers }).subscribe({
      next: () => { this.showToast(`✓ Booking #${id} approved successfully`); this.loadBookings(); },
      error: (err) => { this.showToast(err.error?.error || 'Approval failed'); }
    });
  }

  reject(id: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${id}/reject-booking`, {}, { headers: this.headers }).subscribe({
      next: () => { this.showToast(`✗ Booking #${id} rejected`); this.loadBookings(); },
      error: (err) => { this.showToast(err.error?.error || 'Rejection failed'); }
    });
  }
}
