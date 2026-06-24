
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

// Import correctly from service
import { ActivityService, ActivityHistory } from '../../services/activity';
import { SidebarComponent } from '../sidebar/sidebar';
import { CarbonChartComponent } from '../carbon-chart/carbon-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, CarbonChartComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  greeting = '';
  currentTimeZone = '';

  formData = {
    userName: '',
    electricityUnits: 0,
    vehicleType: 'CAR',
    distanceTravelled: 100,
    foodType: 'NONVEG'
  };

  carbonScore = 0;
  carbonEmission = 0;
  treesSaved = 0;
  goalPercentage = 0;
  ecoLevel = 'Beginner';
  recommendation = '';
  isLoading = false;
  errorMessage = '';
  history: ActivityHistory[] = [];

  constructor(
    private service: ActivityService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) this.greeting = 'Good Morning';
    else if (currentHour < 17) this.greeting = 'Good Afternoon';
    else if (currentHour < 21) this.greeting = 'Good Evening';
    else this.greeting = 'Good Night';

    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
      this.formData.userName = userName;
      this.loadHistory();
    }
  }

  loadHistory(): void {
    if (!this.formData.userName) return;
    this.service.getHistory(this.formData.userName).subscribe({
      next: (data) => {
        this.history = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('History failed:', err)
    });
  }

  calculate(): void {
    this.errorMessage = '';
    this.recommendation = '';
    this.isLoading = true;

    this.service.saveActivity(this.formData).subscribe({
      next: (result) => {
        this.carbonScore = Number(result?.carbonScore) || 0;
        this.carbonEmission = Number(result?.carbonEmission) || 0;
        this.treesSaved = Math.max(1, Math.round(this.carbonScore / 10));
        this.goalPercentage = Math.min(this.carbonScore, 100);
        this.ecoLevel = this.getEcoLevel();
        
        this.loadHistory(); // Refresh history table

        this.service.getRecommendation(this.formData).subscribe({
          next: (aiResult) => {
            this.recommendation = aiResult?.recommendation || 'No tips available';
            localStorage.setItem('recommendation', this.recommendation);
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.recommendation = 'AI recommendation is currently unavailable.';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.errorMessage = 'Unable to process request. Backend may be sleeping.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getEcoLevel(): string {
    if (this.carbonScore >= 90) return '🏆 Eco Champion';
    if (this.carbonScore >= 75) return '🌿 Green User';
    if (this.carbonScore >= 50) return '📘 Eco Learner';
    return '🌱 Beginner';
  }

  downloadReport(): void {
    const doc = new jsPDF();
    doc.text('EcoTrackAI Report', 10, 10);
    doc.text(`Score: ${this.carbonScore}`, 10, 20);
    doc.save('Report.pdf');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}