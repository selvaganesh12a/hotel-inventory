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
    // console.log('Rooms Data:', this.rooms);
    this.fetchBookings();
  }

  fetchRooms(): void {
    console.log('Fetching rooms...');
    this.roomService.getRooms().subscribe(
      (data) => {
        console.log('Fetched Rooms (Raw): ', data);
        this.rooms = data.filter(
          (room: { status: string }) => room.status === 'Available'
        );
        //console.log("Available Rooms: ",this.rooms);
      },
      (error) => console.error('Error fetching rooms:', error)
    );
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe(
      (data) => {
        this.bookings = [...data];
        console.log('Fetched bookings:', this.bookings);
      },
      (error) => console.error('Error fetching bookings:', error)
    );
  }

  bookRoom(): void {
    this.bookingService.bookRoom(this.newBooking).subscribe(
      (response) => {
        alert('Room booked successfully');
        //this.fetchRooms();
        this.rooms = this.rooms.filter(
          (room: { _id: string }) => room._id !== this.newBooking.roomId
        );
        this.fetchBookings();
      },
      (error) => console.error('Error booking room:', error)
    );
  }

  cancelBooking(bookingId: string, roomId: string) {
    console.log('Cancelling Booking:', bookingId, roomId);

    if (!roomId) {
      alert('Cannot cancel booking: Room ID is missing.');
      return;
    }

    if (confirm('Are you sure to cancel this booking ? ')) {
      this.bookingService.cancelBooking(bookingId, roomId).subscribe(() => {
        alert('Booking cancelled successfully');

        setTimeout(() => {
          this.fetchRooms();
          this.fetchBookings();
        }, 1000);
      });
    }
  }
}
