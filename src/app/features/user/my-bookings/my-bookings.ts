import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {
  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { this.error = 'Please log in.'; this.loading = false; return; }

    // /bookings/my-bookings is @jwt_required — returns only this user's bookings
    this.http.get<any[]>('http://127.0.0.1:5000/bookings/my-bookings', { headers: this.headers }).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.error || `Error ${err.status}`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
