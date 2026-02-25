import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-units',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browse-units.html',
  styleUrl: './browse-units.css'
})
export class BrowseUnits implements OnInit {
  towers: any[] = [];
  units: any[] = [];
  selectedTowerId: number | null = null;
  loading = false;
  towersLoading = true;
  bookingMsg = '';
  bookingError = '';
  bookingInProgress: number | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { this.towersLoading = false; return; }

    // Load towers
    this.http.get<any[]>('http://127.0.0.1:5000/towers/', { headers: this.headers }).subscribe({
      next: (data) => {
        this.towers = data;
        this.towersLoading = false;
        // Auto-select tower if passed via query param from browse-towers
        this.route.queryParams.subscribe(params => {
          if (params['tower_id']) {
            this.selectedTowerId = +params['tower_id'];
            this.loadUnits();
          }
        });
        this.cdr.detectChanges();
      },
      error: () => { this.towersLoading = false; this.cdr.detectChanges(); }
    });
  }

  loadUnits() {
    if (!this.selectedTowerId) return;
    this.loading = true;
    this.units = [];
    this.http.get<any[]>(`http://127.0.0.1:5000/units/get-units/${this.selectedTowerId}`, { headers: this.headers }).subscribe({
      next: (data) => { this.units = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  bookUnit(unitId: number) {
    this.bookingInProgress = unitId;
    this.bookingMsg = '';
    this.bookingError = '';
    this.http.post<any>('http://127.0.0.1:5000/bookings/add-booking', { unit_id: unitId }, { headers: this.headers }).subscribe({
      next: (res) => {
        this.bookingMsg = `Unit booked successfully! Booking ID: #${res.booking_id}`;
        this.bookingInProgress = null;
        this.loadUnits(); // Refresh to remove booked unit
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.bookingError = err.error?.error || 'Booking failed';
        this.bookingInProgress = null;
        this.cdr.detectChanges();
      }
    });
  }
}
