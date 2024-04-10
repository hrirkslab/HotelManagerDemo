import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelzimmerService } from './services/hotelzimmer.service';
import { CommonModule } from '@angular/common'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Zimmergroesse } from './enums/zimmergroesse.enum';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from './services/modal.service';


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
  [x: string]: any;

  title = 'Hotel Manager';
  hotelzimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  availablezimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  newHotelzimmer = { zimmerNummer: null, zimmergroesse: '', minibar: false, isAvailable: true };
  selectedRoom: any = {};
  newRoom: any = {};
  searchQuery: string = '';
  bookingStatus: { [key: number]: string } = {};
  isEditMode: boolean = false;

  public Zimmergroesse = Zimmergroesse;

  zimmergroessenMapping = [
    { key: Zimmergroesse.EINZELZIMMER, value: "Einzelzimmer" },
    { key: Zimmergroesse.DOPPELZIMMER, value: "Doppelzimmer" },
    { key: Zimmergroesse.SUITE, value: "Suite" }
  ];

  showNotification = false;
  notificationMessage = '';


  constructor(private hotelzimmerService: HotelzimmerService, @Inject(ModalService) private modalService: ModalService, private modalServiceDialog: NgbModal, private modalDeleteService: NgbModal) { }

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

  addNewHotelzimmer() {
    if (!this.newRoom) return;
    this.newRoom.isAvailable = true;
    this.hotelzimmerService.addHotelzimmer(this.newRoom).subscribe({
      next: (response) => {
        this.newRoom = {}; 
        this.availablezimmerList.push(response);      
      },
      error: (error) => {
        console.error('Error adding room:', error);
        this.showNotification = true;
        this.notificationMessage = 'Fehler beim Hinzufügen des Zimmers!';
      },
      complete: () => {  
        this.showSuccessNotification('Zimmer erfolgreich hinzugefügt!');
        this.loadHotelzimmer();
        this.loadAvailableHotelzimmer(); 
      }
    });
  }

  openDeleteConfirmation(confirmDeleteModal: any, room: any) {
    this.selectedRoom = room;
    this.modalDeleteService.open(confirmDeleteModal, { centered: true });
  }

  deleteRoomAndCloseModal() {
    this.deleteRoom(this.selectedRoom.zimmerNummer); 
    this.modalDeleteService.dismissAll(); 
  }
  

  deleteRoom(roomId: number) {
    this.hotelzimmerService.deleteHotelzimmer(roomId)
      .subscribe({
        next: (response) => {
          this.hotelzimmerList = this.hotelzimmerList.filter(room => room.zimmerNummer !== roomId);
        },
        error: (error) => {
          console.error('Error deleting room:', error);
        }
      });
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

  open(content: any, hotelzimmer: any) {
    this.selectedRoom = hotelzimmer;
    this.modalServiceDialog.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
    }, () => {
    });
  }

  openAddRoomDialog(addRoomContent: any) {
    const modalRef = this.modalServiceDialog.open(addRoomContent);
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  showSuccessNotification(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000); // Hide after 3 seconds
  }

}
