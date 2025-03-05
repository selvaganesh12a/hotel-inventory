import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { RoomService } from '../../services/rooms/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  rooms: any = [];
  bookings: any = [];
  newBooking = {
    roomId: '',
    customerName: '',
    checkInDate: '',
    checkOutDate: '',
  };

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.fetchRooms();
    this.fetchBookings();
  }

  fetchRooms(): void {
    this.roomService.getRooms().subscribe(
      (data) => {
        console.log('Rooms:', data);
        this.rooms = data.filter((room: any) => room.isAvailable); // Show only available rooms
      },
      (error) => console.error('Error fetching rooms:', error)
    );
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => console.error('Error fetching bookings:', error)
    );
  }

  bookRoom(): void {
    this.bookingService.bookRoom(this.newBooking).subscribe(
      (response) => {
        alert('Room booked successfully');
        this.fetchRooms();
        this.fetchBookings();
      },
      (error) => console.error('Error booking room:', error)
    );
  }

  cancelBooking(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId).subscribe(
      () => {
        alert('Booking cancelled successfully');
        this.fetchRooms();
        this.fetchBookings();
      },
      (error) => console.log('Error cancelling booking:', error)
    );
  }
}
