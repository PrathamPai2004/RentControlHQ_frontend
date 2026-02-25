import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {jwtDecode}  from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loginSuccess: boolean = false;
  errorCame: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://127.0.0.1:5000/auth/login', payload)
      .subscribe({
        next: (res) => {

          const token = res.access_token;
          localStorage.setItem('token', token);
          console.log(token);
          const decoded: any = jwtDecode(token);
          console.log(decoded);
          this.loginSuccess = true;
          if (decoded.role === 'admin') {
            this.router.navigate(['/admin/towers']);
          } else {
            this.router.navigate(['/user/towers']);
          }

        },
        error: (err) => {
          this.errorCame = true;
          this.errorCame ? this.errorMessage = err.error?.error || 'Login failed' : this.errorMessage = '';
          this.loginSuccess = false;
        }
      });
  }
}