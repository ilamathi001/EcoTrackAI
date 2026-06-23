import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Added Router for better navigation

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  // Initializing with empty strings
  loginId = '';
  password = '';
  isLoading = false; // Added loading state for better UX

  constructor(
    private http: HttpClient,
    private router: Router // Injected Router
  ) {}

  login(): void {
    // Basic validation to prevent unnecessary API calls
    if (!this.loginId || !this.password) {
      alert('Please enter both Login ID and Password');
      return;
    }

    this.isLoading = true;

    const loginData = {
      loginId: this.loginId,
      password: this.password
    };

    this.http.post('https://ecotrackai-j8be.onrender.com/api/auth/login', loginData)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;

          if (res.success && res.user) {
            // Store user info in localStorage
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('user', JSON.stringify(res.user));
            
            // Redirect using Angular Router (much faster than window.location)
            this.router.navigate(['/dashboard']);
          } else {
            alert(res.message || 'Invalid Email, Mobile Number or Password');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login Error:', err);
          
          // Handle specific HTTP errors (like 401 Unauthorized)
          if (err.status === 401) {
            alert('Unauthorized: Please check your credentials.');
          } else {
            alert('Server is currently unreachable. Please try again later.');
          }
        }
      });
  }
}