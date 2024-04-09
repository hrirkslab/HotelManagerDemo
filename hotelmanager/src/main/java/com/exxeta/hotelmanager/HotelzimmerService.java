package com.exxeta.hotelmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exxeta.hotelmanager.Hotelzimmer.Zimmergroesse;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

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

    @Transactional
    public Hotelzimmer updateHotelzimmerFields(Integer roomNumber, Map<String, Object> fields) {
        Hotelzimmer hotelzimmer = hotelzimmerRepository.findByZimmerNummer(roomNumber)
                .orElseThrow(() -> new IllegalArgumentException("Hotelzimmer with room number " + roomNumber + " not found."));

        fields.forEach((property, value) -> {
            applyPatchUpdate(hotelzimmer, property, value);
        });

        return hotelzimmerRepository.save(hotelzimmer);
    }

    private void applyPatchUpdate(Hotelzimmer hotelzimmer, String property, Object value) {
        switch (property) {
            case "zimmergroesse":
                hotelzimmer.setZimmergroesse(Zimmergroesse.valueOf((String) value));
                break;
            case "minibar":
                hotelzimmer.setMinibar((Boolean) value);
                break;
            case "isAvailable":
                hotelzimmer.setIsAvailable((Boolean) value);
                break;
            default:
                throw new IllegalArgumentException("Unknown property: " + property);
        }
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
