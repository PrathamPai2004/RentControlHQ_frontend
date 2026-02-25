import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-towers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './towers.html',
  styleUrl: './towers.css'
})
export class Towers implements OnInit {
  towers: any[] = [];
  loading = true;
  error = '';

  // Add Tower form
  showForm = false;
  newName = '';
  newTotalUnits: number | null = null;
  addMsg = '';
  addError = '';
  adding = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  ngOnInit() {
    this.loadTowers();
  }

  loadTowers() {
    const token = localStorage.getItem('token');
    if (!token) { this.error = 'No auth token found.'; this.loading = false; return; }
    this.loading = true;
    this.http.get<any[]>('http://127.0.0.1:5000/towers/', { headers: this.headers }).subscribe({
      next: (data) => { this.towers = data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => { this.error = err.error?.error || 'Failed to load towers'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  addTower() {
    if (!this.newName || !this.newTotalUnits) return;
    this.adding = true;
    this.addMsg = '';
    this.addError = '';
    this.http.post<any>('http://127.0.0.1:5000/towers/add-tower',
      { name: this.newName, total_units: this.newTotalUnits },
      { headers: this.headers }
    ).subscribe({
      next: (res) => {
        this.addMsg = res.message;
        this.newName = '';
        this.newTotalUnits = null;
        this.adding = false;
        this.showForm = false;
        this.loadTowers();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.addError = err.error?.error || 'Failed to add tower';
        this.adding = false;
        this.cdr.detectChanges();
      }
    });
  }
}
