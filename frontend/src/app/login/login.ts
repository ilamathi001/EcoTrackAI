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
  styleUrl: './login.css'
})
export class LoginComponent {

  loginId = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {

    this.http.post(
      'https://ecotrackai-j8be.onrender.com/api/auth/login',
      {
        loginId: this.loginId,
        password: this.password
      }
    )
    .subscribe({

      next: (res: any) => {

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
      },

      error: (err) => {

        alert(
          err.error?.message ||
          'Invalid Credentials'
        );
      }
    });
  }
}