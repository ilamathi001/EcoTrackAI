import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginId = '';
  password = '';

  errorMessage = '';

  emailError = '';
  passwordError = '';

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    let isValid = true;

    if (!this.loginId.trim()) {

      this.emailError =
        'Please enter Email or Mobile Number';

      isValid = false;
    }

    if (!this.password.trim()) {

      this.passwordError =
        'Please enter Password';

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    this.isLoading = true;

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/login',
      {
        loginId: this.loginId,
        password: this.password
      }
    )
    .subscribe({

      next: (res: any) => {

        this.isLoading = false;

        if (res?.user) {

          localStorage.setItem(
            'userName',
            res.user.name
          );

          localStorage.setItem(
            'user',
            JSON.stringify(res.user)
          );

          this.router.navigate(
            ['/dashboard']
          );

        } else {

          this.errorMessage =
            'Login failed. Please try again.';
        }
      },

      error: (err) => {

        this.isLoading = false;

        this.errorMessage =
          err?.error?.message ||
          'Wrong Email/Mobile Number or Password';
      }
    });
  }
}