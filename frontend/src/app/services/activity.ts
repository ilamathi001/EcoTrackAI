import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activityUrl = 'http://localhost:8080/api/activity';
  private aiUrl = 'http://localhost:8080/api/ai/recommend';

  constructor(private http: HttpClient) {}

  saveActivity(data: any) {
    return this.http.post(this.activityUrl, data);
  }

  getRecommendation(data: any) {
    return this.http.post(this.aiUrl, data);
  }
}