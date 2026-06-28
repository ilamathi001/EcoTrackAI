import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

export interface ActivityHistory {
  userName?: string;
  carbonScore: number;
  carbonEmission: number;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly BASE_URL = 'https://ecotrackai-j8be.onrender.com';
  private readonly ACTIVITY_URL = `${this.BASE_URL}/api/activity`;
  private readonly AI_URL = `${this.BASE_URL}/api/ai/recommend`;

  constructor(private http: HttpClient) {}

  saveActivity(data: ActivityRequest): Observable<ActivityResponse> {
    return this.http.post<ActivityResponse>(this.ACTIVITY_URL, data)
      .pipe(catchError(this.handleError));
  }

  getRecommendation(data: ActivityRequest): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(this.AI_URL, data)
      .pipe(catchError(this.handleError));
  }

  getHistory(userName: string): Observable<ActivityHistory[]> {

    const sanitizedName = encodeURIComponent(userName.trim());

    return this.http.get<ActivityHistory[]>(
      `${this.ACTIVITY_URL}/history/${sanitizedName}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    console.error('Backend Error:', error);

    let errorMessage = 'Something went wrong';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}