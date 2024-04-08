import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures that the service is available globally
})
export class HotelzimmerService {
    private apiURL = 'http://localhost:8080/api/hotelzimmer';

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
  
    private handleError(error: any) {
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

  // Filter hotel rooms by availability
  filterHotelzimmerByAvailability(isAvailable: boolean): Observable<any> {
    return this.http.get(`${this.apiURL}/filter`, { params: { isAvailable } });
  }
}
