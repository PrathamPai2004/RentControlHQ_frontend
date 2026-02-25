import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // Stats — populated from API
  towerCount: number | string = '…';
  unitCount:  number | string = '…';

  features = [
    {
      icon: '🏢',
      title: 'Browse Towers',
      desc: 'Explore a curated list of residential towers with full details on available units and pricing.'
    },
    {
      icon: '🚪',
      title: 'Book Your Unit',
      desc: 'Reserve a unit in seconds. Choose your tower, pick a unit, and submit a booking request instantly.'
    },
    {
      icon: '📋',
      title: 'Track Bookings',
      desc: 'Monitor your booking status in real time — pending, approved, or rejected, all in one place.'
    },
    {
      icon: '📄',
      title: 'Manage Leases',
      desc: 'View your active lease agreement, start dates, and renewal status from your personal dashboard.'
    },
    {
      icon: '🔐',
      title: 'Secure Access',
      desc: 'JWT-based authentication with role-based access ensures your data is always private and protected.'
    },
    {
      icon: '⚡',
      title: 'Admin Controls',
      desc: 'Admins can add towers, manage units, approve bookings and oversee all tenant activity in real time.'
    }
  ];

  steps = [
    { num: '01', title: 'Register', desc: 'Create your account and verify your email.' },
    { num: '02', title: 'Browse',   desc: 'Explore towers and available units near you.' },
    { num: '03', title: 'Book',     desc: 'Submit a booking request for your preferred unit.' },
    { num: '04', title: 'Move In',  desc: 'Get approved, sign your lease, and move in.' },
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<{ towers: number; units: number }>('http://127.0.0.1:5000/public/stats').subscribe({
      next: (res) => {
        this.towerCount = res.towers;
        this.unitCount  = res.units;
        this.cdr.detectChanges();
      },
      error: () => {
        this.towerCount = '—';
        this.unitCount  = '—';
        this.cdr.detectChanges();
      }
    });
  }
}
