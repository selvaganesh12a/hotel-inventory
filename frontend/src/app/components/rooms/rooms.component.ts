import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/rooms/room.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  rooms: any = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.log('Error fetching rooms:', error);
      }
    );
  }
}
