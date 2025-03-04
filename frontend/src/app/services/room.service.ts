import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/api/rooms'; // url of the rooms api

  constructor(private http: HttpClient) { }

  //function to get all rooms
  getRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

}
