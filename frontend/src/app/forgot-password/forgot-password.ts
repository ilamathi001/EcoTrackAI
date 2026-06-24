import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  email = '';
  newPassword = '';
  confirmPassword = '';

  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  errorMessage = '';
  successMessage = '';

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  resetPassword(): void {

    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.errorMessage = '';
    this.successMessage = '';

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let isValid = true;

    // Email Validation

    if (!this.email.trim()) {

      this.emailError =
        'Please enter your Email Address';

      isValid = false;

    } else if (
      !emailPattern.test(
        this.email.trim()
      )
    ) {

      this.emailError =
        'Please enter a valid Email Address';

      isValid = false;
    }

    // Password Validation

    if (!this.newPassword.trim()) {

      this.passwordError =
        'Please enter your New Password';

      isValid = false;

    } else if (
      !passwordPattern.test(
        this.newPassword
      )
    ) {

      this.passwordError =
        'Password must contain uppercase, lowercase, number and special character';

      isValid = false;
    }

    // Confirm Password

    if (!this.confirmPassword.trim()) {

      this.confirmPasswordError =
        'Please confirm your Password';

      isValid = false;
    }

    if (
      this.newPassword &&
      this.confirmPassword &&
      this.newPassword !== this.confirmPassword
    ) {

      this.confirmPasswordError =
        'Passwords do not match';

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    this.isLoading = true;

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/change-password',
      {
        email: this.email.trim(),
        newPassword: this.newPassword
      }
    )
    .pipe(
      timeout(15000)
    )
    .subscribe({

      next: (res: any) => {

        this.isLoading = false;

        this.successMessage =
          res?.message ||
          'Password Updated Successfully';

        setTimeout(() => {

          this.router.navigate(
            ['/login']
          );

        }, 1500);
      },

      error: (err) => {

        this.isLoading = false;

        if (
          err?.error?.message
        ) {

          this.errorMessage =
            err.error.message;

        } else {

          this.errorMessage =
            'Server unavailable. Please try again.';
        }
      }
    });
  }
}