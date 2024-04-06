package com.exxeta.hotelmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exxeta.hotelmanager.Hotelzimmer;
import com.exxeta.hotelmanager.HotelzimmerService;

@RestController
@RequestMapping("/api/hotelzimmer")
public class HotelzimmerController {

    private final HotelzimmerService hotelzimmerService;

    public HotelzimmerController(HotelzimmerService hotelzimmerService) {
        this.hotelzimmerService = hotelzimmerService;
    }

    // Create a new hotel room
    @PostMapping
    public ResponseEntity<Hotelzimmer> createHotelzimmer(@RequestBody Hotelzimmer hotelzimmer) {
        Hotelzimmer createdHotelzimmer = hotelzimmerService.createHotelzimmer(hotelzimmer);
        return new ResponseEntity<>(createdHotelzimmer, HttpStatus.CREATED);
    }

    // List all hotel rooms
    @GetMapping
    public ResponseEntity<List<Hotelzimmer>> getAllHotelzimmer() {
        List<Hotelzimmer> hotelzimmerList = hotelzimmerService.getAllHotelzimmer();
        return ResponseEntity.ok(hotelzimmerList);
    }

    // Get a hotel room by its room number
    @GetMapping("/{roomNumber}")
    public ResponseEntity<Hotelzimmer> getHotelzimmerByRoomNumber(@PathVariable Integer roomNumber) {
        Hotelzimmer hotelzimmer = hotelzimmerService.getHotelzimmerByRoomNumber(roomNumber);
        return ResponseEntity.ok(hotelzimmer);
    }

    // Update a hotel room by its room number
    @PutMapping("/{roomNumber}")
    public ResponseEntity<Hotelzimmer> updateHotelzimmer(@PathVariable Integer roomNumber,
                                                         @RequestBody Hotelzimmer hotelzimmer) {
        Hotelzimmer updatedHotelzimmer = hotelzimmerService.updateHotelzimmer(roomNumber, hotelzimmer);
        return ResponseEntity.ok(updatedHotelzimmer);
    }

    // Filter hotel rooms if available
    @GetMapping("/filter")
    public ResponseEntity<List<Hotelzimmer>> filterHotelzimmerByAvailability(@RequestParam(required = false) Boolean isAvailable) {
        if (isAvailable == null) {
            isAvailable = true;
        }
        List<Hotelzimmer> filteredHotelzimmer = hotelzimmerService.findAvailableRooms(isAvailable);
        return ResponseEntity.ok(filteredHotelzimmer);
    }
}
