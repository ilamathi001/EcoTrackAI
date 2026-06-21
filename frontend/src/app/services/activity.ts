import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activityUrl =
    'https://ecotrackai-j8be.onrender.com/api/activity';

  private aiUrl =
    'https://ecotrackai-j8be.onrender.com/api/ai/recommend';

  constructor(private http: HttpClient) {}

  saveActivity(data: any) {
    return this.http.post(this.activityUrl, data);
  }

  getRecommendation(data: any) {
    return this.http.post(this.aiUrl, data);
  }
}