import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {

  email = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private http: HttpClient
  ) {}

  resetPassword(): void {

    if (this.newPassword !== this.confirmPassword) {

      alert('Passwords do not match');
      return;
    }

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/change-password',
      {
        email: this.email,
        newPassword: this.newPassword
      }
    ).subscribe((res: any) => {

      alert(res.message);

      window.location.href = '/login';
    });
  }
}