import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {
  bookings: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadBookings();
  }

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
      next: (data) => {
        this.bookings = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.msg || err.error?.error || `Error ${err.status}: Failed to load bookings`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(id: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${id}/approve`, {}, { headers: this.headers }).subscribe({
      next: () => {
        this.actionMsg = `Booking #${id} approved ✅`;
        this.cdr.detectChanges();
        this.loadBookings();
      },
      error: (err) => {
        this.actionMsg = err.error?.error || 'Approval failed';
        this.cdr.detectChanges();
      }
    });
  }

  reject(id: number) {
    this.http.put(`http://127.0.0.1:5000/bookings/${id}/reject-booking`, {}, { headers: this.headers }).subscribe({
      next: () => {
        this.actionMsg = `Booking #${id} rejected ❌`;
        this.cdr.detectChanges();
        this.loadBookings();
      },
      error: (err) => {
        this.actionMsg = err.error?.error || 'Rejection failed';
        this.cdr.detectChanges();
      }
    });
  }
}
