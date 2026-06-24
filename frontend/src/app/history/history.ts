import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity';
import { SidebarComponent } from '../dashboard/sidebar/sidebar';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit {

  history: any[] = [];

  isLoading = true;

  constructor(
    private service: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const rawName =
      localStorage.getItem('userName');

    if (!rawName) {

      this.isLoading = false;
      return;
    }

    this.service
      .getHistory(rawName)
      .subscribe({

        next: (data) => {

          this.history = data || [];

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'History Error',
            err
          );

          this.isLoading = false;

          this.cdr.detectChanges();
        }
      });
  }
}