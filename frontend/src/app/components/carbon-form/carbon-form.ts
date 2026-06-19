import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity';

@Component({
  selector: 'app-carbon-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carbon-form.html',
  styleUrl: './carbon-form.css'
})
export class CarbonForm {

  formData = {
    userName: '',
    electricityUnits: 0,
    vehicleType: 'CAR',
    distanceTravelled: 100,
    foodType: 'NONVEG'
  };

  carbonScore: number = 0;
  carbonEmission: number = 0;
  recommendation: string = '';

  constructor(private service: ActivityService) {}

  calculate(): void {

    this.service.saveActivity(this.formData)
      .subscribe({
        next: (res: any) => {
          this.carbonScore = res.carbonScore;
          this.carbonEmission = res.carbonEmission;
        },
        error: (err) => {
          console.error('Activity API Error', err);
        }
      });

    this.service.getRecommendation(this.formData)
      .subscribe({
        next: (res: any) => {
          this.recommendation = res.recommendation;
        },
        error: (err) => {
          console.error('AI API Error', err);
        }
      });
  }
}