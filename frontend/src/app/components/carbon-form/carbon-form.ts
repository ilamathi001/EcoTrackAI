import {
Component,
OnInit,
ChangeDetectorRef
} from '@angular/core';

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

constructor(
private service: ActivityService,
private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {

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

next: (data: any) => {

this.history = data;

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

this.service.saveActivity(
this.formData
)
.subscribe({

next: (result: any) => {

this.carbonScore =
Number(result.carbonScore) || 0;

this.carbonEmission =
Number(result.carbonEmission) || 0;

this.isLoading = false;

this.loadHistory();

this.cdr.detectChanges();

this.service
.getRecommendation(
this.formData
)
.subscribe({

next: (aiResult: any) => {

this.recommendation =
aiResult.recommendation || '';

this.cdr.detectChanges();
},

error: () => {

this.recommendation =
'AI recommendation is currently unavailable.';

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

goToProfile(): void {

window.location.href =
'/profile';
}

logout(): void {

localStorage.clear();

window.location.href =
'/login';
}

}
