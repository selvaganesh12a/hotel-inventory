import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  bookRoom(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book`, bookingData);
  }

  updateRoom(bookingId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update/${bookingId}`,
      updatedData
    );
  }

  cancelBooking(bookingId: string, roomId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${bookingId}/${roomId}`);
  }
}
