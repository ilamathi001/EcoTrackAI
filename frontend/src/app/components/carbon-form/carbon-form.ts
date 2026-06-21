import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity';

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
      console.error('History Error:', err);
    }
  });


}

calculate(): void {


alert('BUTTON CLICKED');

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

console.log('Sending Request:', this.formData);

this.service.saveActivity(this.formData)
  .subscribe({

    next: (result: any) => {

      alert('API SUCCESS');

      console.log('Response:', result);

      this.carbonScore = result.carbonScore;
      this.carbonEmission = result.carbonEmission;

      this.loadHistory();

      this.isLoading = false;
    },

    error: (err) => {

      alert('API ERROR');

      console.error('API Error:', err);

      this.errorMessage =
        'Unable to process request. Please try again.';

      this.isLoading = false;
    }

  });


}
}
