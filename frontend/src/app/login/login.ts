import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './login.html'
})
export class LoginComponent {

loginId = '';
password = '';

constructor(
private http: HttpClient
) {}

login(): void {


this.http.post(
  'https://ecotrackai-j8be.onrender.com/api/auth/login',
  {
    loginId: this.loginId,
    password: this.password
  }
)
.subscribe((res: any) => {

  if (res.success) {

    localStorage.setItem(
      'userName',
      res.user.name
    );

    localStorage.setItem(
      'user',
      JSON.stringify(res.user)
    );

    window.location.href =
      '/dashboard';

  } else {

    alert(
      'Invalid Email, Mobile Number or Password'
    );
  }
});


}
}
