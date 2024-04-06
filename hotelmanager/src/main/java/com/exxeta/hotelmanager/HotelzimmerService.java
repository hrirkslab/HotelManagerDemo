package com.exxeta.hotelmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelzimmerService {

    private final HotelzimmerRepository hotelzimmerRepository;

    @Autowired
    public HotelzimmerService(HotelzimmerRepository hotelzimmerRepository) {
        this.hotelzimmerRepository = hotelzimmerRepository;
    }

    public Hotelzimmer createHotelzimmer(Hotelzimmer hotelzimmer) {
        return hotelzimmerRepository.save(hotelzimmer);
    }

    public Hotelzimmer getHotelzimmerByRoomNumber(Integer roomNumber) {
        return hotelzimmerRepository.findByZimmerNummer(roomNumber)
                .orElseThrow();
    }

    public Hotelzimmer updateHotelzimmer(Integer roomNumber, Hotelzimmer hotelzimmerDetails) {
        Hotelzimmer hotelzimmer = hotelzimmerRepository.findByZimmerNummer(roomNumber)
                .orElseThrow();

        hotelzimmer.setZimmergroesse(hotelzimmerDetails.getZimmergroesse());
        hotelzimmer.setMinibar(hotelzimmerDetails.isMinibar());

        return hotelzimmerRepository.save(hotelzimmer);
    }

    public List<Hotelzimmer> filterHotelzimmer(Boolean hasMinibar) {
        if (hasMinibar != null) {
            return hotelzimmerRepository.findByMinibarTrue();
        } else {
            return hotelzimmerRepository.findAll();
        }
    }

    public List<Hotelzimmer> getAllHotelzimmer() {
        return hotelzimmerRepository.findAll();
    }

    public List<Hotelzimmer> findAvailableRooms(boolean isAvailable) {
        return hotelzimmerRepository.findByIsAvailable(isAvailable);
    }
}
