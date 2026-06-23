import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-register',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './register.html'
})
export class RegisterComponent {

name = '';
email = '';
mobileNumber = '';
password = '';

constructor(
private http: HttpClient
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
.subscribe(() => {

  alert(
    'Registration Successful'
  );

  window.location.href =
    '/login';
});


}
}
