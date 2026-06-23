import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ActivityRequest {
userName: string;
electricityUnits: number;
vehicleType: string;
distanceTravelled: number;
foodType: string;
}

export interface ActivityResponse {
carbonScore: number;
carbonEmission: number;
}

export interface RecommendationResponse {
recommendation: string;
}

@Injectable({
providedIn: 'root'
})
export class ActivityService {

private readonly BASE_URL =
'https://ecotrackai-j8be.onrender.com';

private readonly ACTIVITY_URL =
`${this.BASE_URL}/api/activity`;

private readonly AI_URL =
`${this.BASE_URL}/api/ai/recommend`;

constructor(private http: HttpClient) {}

saveActivity(
data: ActivityRequest
): Observable<ActivityResponse> {


return this.http.post<ActivityResponse>(
  this.ACTIVITY_URL,
  data
);


}

getRecommendation(
data: ActivityRequest
): Observable<RecommendationResponse> {


return this.http.post<RecommendationResponse>(
  this.AI_URL,
  data
);


}

getHistory(
userName: string
): Observable<any[]> {

return this.http.get<any[]>(
  `${this.ACTIVITY_URL}/history/${userName}`
);


}
}
