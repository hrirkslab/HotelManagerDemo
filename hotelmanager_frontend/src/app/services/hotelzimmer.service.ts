import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.docker';

@Injectable({
  providedIn: 'root'
})
export class HotelzimmerService {
    private apiURL = environment.apiURL;;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    constructor(private http: HttpClient) { }
  
    getHotelzimmer(): Observable<any> {
      return this.http.get(this.apiURL)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    addHotelzimmer(hotelzimmer: any): Observable<any> {
      return this.http.post(this.apiURL, hotelzimmer, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    updateHotelzimmer(id: number, hotelzimmer: any): Observable<any> {
      return this.http.put(`${this.apiURL}/${id}`, hotelzimmer, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }

    updateHotelzimmerAvailability(id: number, isAvailable: boolean): Observable<any> {
        return this.http.patch(`${this.apiURL}/${id}`, { isAvailable: isAvailable });
      }
      
  
    private handleError(error: any) {
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

  // Filter hotel rooms by availability
  filterHotelzimmerByAvailability(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((response: any[]) => response.filter(zimmer => zimmer.isAvailable))
    );
    }
}
