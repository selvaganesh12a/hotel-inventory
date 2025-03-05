import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from "./components/rooms/rooms.component";
import { BookingComponent } from "./components/booking/booking.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RoomsComponent, BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-inventory';
}
