import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leases.html',
  styleUrls: ['../towers/towers.css', './leases.css']
})
export class Leases implements OnInit {
  leases: any[] = [];
  loading = true;
  error = '';

  get activeCount(): number { return this.leases.filter(l => !l.end_date).length; }
  get expiredCount(): number { return this.leases.filter(l => !!l.end_date).length; }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No auth token found. Please log in again.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<any[]>('http://127.0.0.1:5000/leases/get-leases', { headers }).subscribe({
      next: (data) => { this.leases = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => {
        this.error = err.error?.msg || err.error?.error || `Error ${err.status}: Failed to load leases`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
