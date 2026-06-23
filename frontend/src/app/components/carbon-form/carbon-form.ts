import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { jsPDF } from 'jspdf';

import { ActivityService } from '../../services/activity';

interface ActivityHistory {
  carbonScore: number;
  carbonEmission: number;
}

@Component({
  selector: 'app-carbon-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './carbon-form.html',
  styleUrls: ['./carbon-form.css']
})
export class CarbonForm implements OnInit {

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
  recommendation = '';

  isLoading = false;
  errorMessage = '';

  history: ActivityHistory[] = [];

  constructor(
    private service: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.currentTimeZone =
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;

    const currentHour = Number(
      new Intl.DateTimeFormat(
        'en-US',
        {
          hour: 'numeric',
          hour12: false,
          timeZone: this.currentTimeZone
        }
      ).format(new Date())
    );

    if (currentHour < 12) {

      this.greeting =
        'Good Morning';

    } else if (currentHour < 17) {

      this.greeting =
        'Good Afternoon';

    } else if (currentHour < 21) {

      this.greeting =
        'Good Evening';

    } else {

      this.greeting =
        'Good Night';
    }

    const user =
      localStorage.getItem('user');

    if (!user) {

      window.location.href =
        '/login';

      return;
    }

    const userName =
      localStorage.getItem('userName');

    if (userName) {

      this.formData.userName =
        userName;

      this.loadHistory();
    }
  }

  loadHistory(): void {

    if (!this.formData.userName) {
      return;
    }

    this.service
      .getHistory(this.formData.userName)
      .subscribe({

        next: (data: ActivityHistory[]) => {

          this.history =
            data || [];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'History Error:',
            err
          );
        }
      });
  }

  calculate(): void {

    this.errorMessage = '';
    this.recommendation = '';

    if (!this.formData.userName.trim()) {

      this.errorMessage =
        'Please enter your name';

      return;
    }

    this.isLoading = true;

    this.service
      .saveActivity(this.formData)
      .subscribe({

        next: (result: any) => {

          this.carbonScore =
            Number(result?.carbonScore) || 0;

          this.carbonEmission =
            Number(result?.carbonEmission) || 0;

          this.loadHistory();

          this.service
            .getRecommendation(this.formData)
            .subscribe({

              next: (aiResult: any) => {

                this.recommendation =
                  aiResult?.recommendation ||
                  'No recommendation available';

                this.isLoading = false;

                this.cdr.detectChanges();
              },

              error: () => {

                this.recommendation =
                  'AI recommendation is currently unavailable.';

                this.isLoading = false;

                this.cdr.detectChanges();
              }
            });
        },

        error: () => {

          this.errorMessage =
            'Unable to process request. Please try again.';

          this.isLoading = false;

          this.cdr.detectChanges();
        }
      });
  }

  downloadReport(): void {

    const doc =
      new jsPDF();

    const userTimeZone =
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;

    const localDateTime =
      new Date().toLocaleString(
        'en-IN',
        {
          timeZone: userTimeZone,
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      );

    doc.setFontSize(22);

    doc.text(
      'EcoTrackAI',
      105,
      20,
      {
        align: 'center'
      }
    );

    doc.setFontSize(16);

    doc.text(
      'Sustainability Report',
      105,
      30,
      {
        align: 'center'
      }
    );

    doc.line(
      20,
      40,
      190,
      40
    );

    doc.setFontSize(14);

    doc.text(
      'User Information',
      20,
      55
    );

    doc.setFontSize(12);

    doc.text(
      `Name: ${this.formData.userName}`,
      20,
      65
    );

    doc.setFontSize(14);

    doc.text(
      'Sustainability Metrics',
      20,
      85
    );

    doc.setFontSize(12);

    doc.text(
      `Carbon Score: ${this.carbonScore}`,
      20,
      95
    );

    doc.text(
      `Carbon Emission: ${this.carbonEmission} kg CO₂`,
      20,
      105
    );

    doc.setFontSize(14);

    doc.text(
      'Generated On',
      20,
      125
    );

    doc.setFontSize(12);

    doc.text(
      `${localDateTime} (${userTimeZone})`,
      20,
      135
    );

    doc.setFontSize(14);

    doc.text(
      'AI Recommendation',
      20,
      155
    );

    doc.setFontSize(12);

    const recommendation =
      this.recommendation ||
      'No recommendation available';

    const lines =
      doc.splitTextToSize(
        recommendation,
        170
      );

    doc.text(
      lines,
      20,
      165,
      {
        maxWidth: 170
      }
    );

    doc.line(
      20,
      260,
      190,
      260
    );

    doc.setFontSize(11);

    doc.text(
      'Thank you for supporting a greener future.',
      105,
      270,
      {
        align: 'center'
      }
    );

    doc.save(
      `${this.formData.userName}_EcoTrackAI_Report.pdf`
    );
  }

  goToProfile(): void {

    window.location.href =
      '/profile';
  }

  logout(): void {

    localStorage.clear();

    window.location.href =
      '/login';
  }

  getBadge(score: number): string {

    if (score >= 90) {
      return '🏆 Eco Champion';
    }

    if (score >= 75) {
      return '🌿 Green User';
    }

    return '⚠️ Needs Improvement';
  }
}