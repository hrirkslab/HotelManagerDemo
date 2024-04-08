import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelzimmerService } from './services/hotelzimmer.service';
import { CommonModule } from '@angular/common'
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Hotel Manager';
  hotelzimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  availablezimmerList: { zimmerNummer: number, zimmergroesse: string, minibar: boolean, isAvailable: boolean }[] = [];
  newHotelzimmer = { zimmerNummer: null, zimmergroesse: '', minibar: false, isAvailable: true };
  selectedRoom: any;
  searchQuery: string = '';

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

  bookHotelzimmer(zimmerNummer: number) {
    this.hotelzimmerService.updateHotelzimmerAvailability(zimmerNummer, false).subscribe(() => {
      this.loadAvailableHotelzimmer();
    });
  }
  
  updateRoom(): void {
    if (this.selectedRoom) {
      this.hotelzimmerService.updateHotelzimmer(this.selectedRoom.id, this.selectedRoom).subscribe(() => {
        this.loadHotelzimmer();
        this.resetSelection();
      });
    }
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
      // Handle closing of modal
    }, () => {
      // Handle dismissal of modal
    });

  }

}
