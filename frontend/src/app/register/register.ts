import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  mobileNumber = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(): void {

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/register',
      {
        name: this.name,
        email: this.email,
        mobileNumber: this.mobileNumber,
        password: this.password
      }
    )
    .subscribe({

      next: () => {

        alert('Registration Successful');

        this.router.navigate(['/login']);
      },

      error: (err) => {

        alert(
          err.error?.message ||
          'Registration Failed'
        );
      }
    });
  }
}