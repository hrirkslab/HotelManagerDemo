import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelzimmerService } from './services/hotelzimmer.service';
import { CommonModule } from '@angular/common'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Zimmergroesse } from './enums/zimmergroesse.enum';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('600ms', style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent {

  title = 'Hotel Manager';
  hotelzimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  availablezimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  newHotelzimmer = { zimmerNummer: null, zimmergroesse: '', minibar: false, isAvailable: true };
  selectedRoom: any = {}; 
  searchQuery: string = '';
  bookingStatus: {[key: number]: string} = {};
  isEditMode: boolean = false;

  public Zimmergroesse = Zimmergroesse;

  zimmergroessenMapping = [
    { key: Zimmergroesse.EINZELZIMMER, value: "Einzelzimmer" },
    { key: Zimmergroesse.DOPPELZIMMER, value: "Doppelzimmer" },
    { key: Zimmergroesse.SUITE, value: "Suite" }
  ];

  showNotification = false;
  notificationMessage = '';


  constructor(private hotelzimmerService: HotelzimmerService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadHotelzimmer();
    this.loadAvailableHotelzimmer();
  }

  loadHotelzimmer(): void {
    this.hotelzimmerService.getHotelzimmer().subscribe(data => {
      this.hotelzimmerList = data;
    });
  }

  loadAvailableHotelzimmer() {
    this.hotelzimmerService.filterHotelzimmerByAvailability().subscribe(data => {
      this.availablezimmerList = data;
    });
  }

  addRoom(): void {
    this.hotelzimmerService.addHotelzimmer(this.newHotelzimmer).subscribe(() => {
      this.loadHotelzimmer();
      this.resetForm();
    });
  }

  /**
 * Updates the availability of a hotel room and handles UI updates.
 * 
 * @param zimmerNummer The room number to update.
 * @param isAvailable The new availability status for the room.
 */
updateHotelzimmerAvailability(zimmerNummer: number, isAvailable: boolean) {
  const action = isAvailable ? 'Canceled' : 'Booked';
  
  this.hotelzimmerService.updateHotelzimmerAvailability(zimmerNummer, isAvailable).subscribe({
    next: () => {
      this.bookingStatus[zimmerNummer] = action;
      
      if (this.selectedRoom && this.selectedRoom.zimmerNummer === zimmerNummer) {
        this.selectedRoom.isAvailable = isAvailable;
      }
  
      this.loadAvailableHotelzimmer();
    },
    error: (error) => {
      console.error(`${action} failed:`, error);
      this.bookingStatus[zimmerNummer] = `${action} failed`;
    },
    complete: () => console.log(`${action} process completed.`)
  });
}

bookHotelzimmer(zimmerNummer: number) {
  this.updateHotelzimmerAvailability(zimmerNummer, false);
}

cancelHotelzimmer(zimmerNummer: number) {
  this.updateHotelzimmerAvailability(zimmerNummer, true);
}
  
  
  updateRoom(): void {
    if (this.selectedRoom) {
      this.hotelzimmerService.updateHotelzimmer(this.selectedRoom.id, this.selectedRoom).subscribe(() => {
        this.loadHotelzimmer();
        this.resetSelection();
      });
    }
  }

  editHotelzimmer(hotelzimmer: any) {
    this.isEditMode = !this.isEditMode;
  }

  submitEdit(zimmerNummer: number) {
    this.hotelzimmerService.updateHotelzimmer(zimmerNummer, this.selectedRoom).subscribe({
      next: () => {
        console.log('Update successful');
        this.isEditMode = false;
        this.loadAvailableHotelzimmer();
      },
      error: (error) => console.error('Update failed:', error)
    });
  }
  
  

  resetForm(): void {
    this.newHotelzimmer = { zimmerNummer: null, zimmergroesse: '', minibar: false, isAvailable: true };
  }

  resetSelection(): void {
    this.selectedRoom = null;
  }

  selectRoom(room: any) {
    // TODO : Implement logic to handle room selection 
    this.selectedRoom = room;
  }

  open(content: any, hotelzimmer: any) {
    this.selectedRoom = hotelzimmer;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, () => {
    });

  }

  showSuccessNotification(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000); // Hide after 3 seconds
  }

}
