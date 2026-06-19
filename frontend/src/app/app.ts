import { Component } from '@angular/core';
import { CarbonForm } from './components/carbon-form/carbon-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarbonForm],
  templateUrl: './app.html'
})
export class App {
}