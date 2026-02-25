import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './units.html',
  styleUrl: './units.css'
})
export class Units implements OnInit {
  units: any[] = [];
  towers: any[] = [];
  selectedTowerId: number | null = null;
  loading = false;
  towersLoading = true;
  error = '';

  // Add Unit form
  showForm = false;
  newTowerId: number | null = null;
  newUnitNumber: number | null = null;
  newRent: number | null = null;
  addMsg = '';
  addError = '';
  adding = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { this.error = 'No auth token found.'; this.towersLoading = false; return; }
    this.http.get<any[]>('http://127.0.0.1:5000/towers/', { headers: this.headers }).subscribe({
      next: (data) => { this.towers = data; this.towersLoading = false; this.cdr.detectChanges(); },
      error: () => { this.towersLoading = false; this.cdr.detectChanges(); }
    });
  }

  loadUnits() {
    if (!this.selectedTowerId) return;
    this.loading = true;
    this.error = '';
    this.http.get<any[]>(`http://127.0.0.1:5000/units/get-units/${this.selectedTowerId}?all=true`, { headers: this.headers }).subscribe({
      next: (data) => { this.units = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => { this.error = err.error?.error || `Error ${err.status}`; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  addUnit() {
    if (!this.newTowerId || !this.newUnitNumber || !this.newRent) return;
    this.adding = true;
    this.addMsg = '';
    this.addError = '';
    this.http.post<any>('http://127.0.0.1:5000/units/add-unit',
      { tower_id: this.newTowerId, unit_number: this.newUnitNumber, rent: this.newRent },
      { headers: this.headers }
    ).subscribe({
      next: (res) => {
        this.addMsg = res.message || 'Unit added successfully!';
        this.newUnitNumber = null;
        this.newRent = null;
        this.adding = false;
        this.showForm = false;
        // Refresh units if currently viewing the same tower
        if (this.selectedTowerId === this.newTowerId) this.loadUnits();
        this.newTowerId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.addError = err.error?.error || 'Failed to add unit';
        this.adding = false;
        this.cdr.detectChanges();
      }
    });
  }
}
