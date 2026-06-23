import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem('user');

    if (storedUser) {

      this.user =
        JSON.parse(storedUser);
    }
  }

  logout(): void {

    localStorage.clear();

    window.location.href =
      '/login';
  }

  goToDashboard(): void {

    window.location.href =
      '/dashboard';
  }
}