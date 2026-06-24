import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../dashboard/sidebar/sidebar';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './recommendations.html',
  styleUrls: ['./recommendations.css']
})
export class RecommendationsComponent
implements OnInit {

  recommendations: any[] = [];

  ngOnInit(): void {

    const savedRecommendation =
      localStorage.getItem(
        'recommendation'
      );

    if (
      savedRecommendation &&
      savedRecommendation.trim() !== ''
    ) {

      this.recommendations = [
        {
          recommendation:
            savedRecommendation
        }
      ];
    }
  }
}