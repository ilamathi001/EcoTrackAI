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


this.errorMessage = '';
this.recommendation = '';

if (!this.formData.userName.trim()) {
  this.errorMessage = 'Please enter your name';
  return;
}

this.isLoading = true;

this.service.saveActivity(this.formData)
  .subscribe({

    next: (result: any) => {

      console.log('Activity Response:', result);

      this.carbonScore = result.carbonScore;
      this.carbonEmission = result.carbonEmission;

      this.loadHistory();

      this.isLoading = false;

      this.service.getRecommendation(this.formData)
        .subscribe({

          next: (aiResult: any) => {

            console.log('AI Response:', aiResult);

            this.recommendation =
              aiResult.recommendation;
          },

          error: (err) => {

            console.error('AI Error:', err);

            this.recommendation =
              'AI recommendation is currently unavailable.';
          }

        });

    },

    error: (err) => {

      console.error('Activity Error:', err);

      this.errorMessage =
        'Unable to process request. Please try again.';

      this.isLoading = false;
    }

  });


}
}
