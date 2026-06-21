import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActivityService } from '../../services/activity';

interface ActivityResponse {
carbonScore: number;
carbonEmission: number;
}

interface RecommendationResponse {
recommendation: string;
}

@Component({
selector: 'app-carbon-form',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './carbon-form.html',
styleUrls: ['./carbon-form.css']
})
export class CarbonForm implements OnInit {

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

history: any[] = [];

constructor(private service: ActivityService) {}

ngOnInit(): void {
this.loadHistory();
}

loadHistory(): void {


this.service.getHistory()
  .subscribe({
    next: (data: any) => {
      this.history = data;
    },
    error: (err) => {
      console.error(err);
    }
  });


}

calculate(): void {


this.errorMessage = '';

if (!this.formData.userName.trim()) {
  this.errorMessage = 'Please enter your name';
  return;
}

if (this.formData.electricityUnits < 0) {
  this.errorMessage = 'Electricity units cannot be negative';
  return;
}

if (this.formData.distanceTravelled < 0) {
  this.errorMessage = 'Distance travelled cannot be negative';
  return;
}

this.isLoading = true;

forkJoin({
  activity: this.service.saveActivity(this.formData),
  recommendation: this.service.getRecommendation(this.formData)
}).subscribe({
  next: (result: {
    activity: ActivityResponse;
    recommendation: RecommendationResponse;
  }) => {

    this.carbonScore = result.activity.carbonScore;
    this.carbonEmission = result.activity.carbonEmission;
    this.recommendation =
      result.recommendation.recommendation;

    this.loadHistory();
    this.isLoading = false;
  },

  error: (err) => {

    console.error(err);

    this.errorMessage =
      'Unable to process request. Please try again.';

    this.isLoading = false;
  }
});


}
}
