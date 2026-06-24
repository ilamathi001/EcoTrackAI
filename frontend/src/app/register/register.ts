import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  mobileNumber = '';
  password = '';

  nameError = '';
  emailError = '';
  mobileError = '';
  passwordError = '';

  errorMessage = '';
  successMessage = '';

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(): void {

    this.nameError = '';
    this.emailError = '';
    this.mobileError = '';
    this.passwordError = '';
    this.errorMessage = '';
    this.successMessage = '';

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobilePattern =
      /^[0-9]{10}$/;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let isValid = true;

    // Full Name

    if (!this.name.trim()) {

      this.nameError =
        'Please enter your Full Name';

      isValid = false;

    } else if (
      this.name.trim().length < 3
    ) {

      this.nameError =
        'Full Name must contain at least 3 characters';

      isValid = false;
    }

    // Email

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

    // Mobile

    if (!this.mobileNumber.trim()) {

      this.mobileError =
        'Please enter your Mobile Number';

      isValid = false;

    } else if (
      !mobilePattern.test(
        this.mobileNumber.trim()
      )
    ) {

      this.mobileError =
        'Mobile Number must be exactly 10 digits';

      isValid = false;
    }

    // Password

    if (!this.password.trim()) {

      this.passwordError =
        'Please enter your Password';

      isValid = false;

    } else if (
      !passwordPattern.test(
        this.password
      )
    ) {

      this.passwordError =
        'Password must contain uppercase, lowercase, number and special character';

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    this.isLoading = true;

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/register',
      {
        name: this.name.trim(),
        email: this.email.trim(),
        mobileNumber: this.mobileNumber.trim(),
        password: this.password
      }
    )
    .pipe(
      timeout(15000)
    )
    .subscribe({

      next: () => {

        this.isLoading = false;

        this.successMessage =
          'Account Created Successfully';

        setTimeout(() => {

          this.router.navigate(
            ['/login']
          );

        }, 1500);
      },

      error: (err) => {

        this.isLoading = false;

        this.errorMessage =
          err?.error?.message ||
          'Server unavailable. Please try again.';
      }
    });
  }
}