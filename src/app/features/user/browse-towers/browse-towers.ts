import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-towers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse-towers.html',
  styleUrl: './browse-towers.css'
})
export class BrowseTowers implements OnInit {
  towers: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) { this.error = 'Please log in.'; this.loading = false; return; }

    this.http.get<any[]>('http://127.0.0.1:5000/towers/', { headers: this.headers }).subscribe({
      next: (data) => { this.towers = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => { this.error = err.error?.error || 'Failed to load towers'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  viewUnits(towerId: number) {
    this.router.navigate(['/user/units'], { queryParams: { tower_id: towerId } });
  }
}
