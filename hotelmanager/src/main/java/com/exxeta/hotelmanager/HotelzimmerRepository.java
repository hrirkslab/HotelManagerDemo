package com.exxeta.hotelmanager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelzimmerRepository extends JpaRepository<Hotelzimmer, Integer> {

    Optional<Hotelzimmer> findByZimmerNummer(Integer zimmerNummer);

    List<Hotelzimmer> findByMinibarTrue();

    List<Hotelzimmer> findByMinibarFalse();

    List<Hotelzimmer> findByZimmergroesse(Hotelzimmer.Zimmergroesse zimmergroesse);

    List<Hotelzimmer> findByIsAvailable(boolean isAvailable);

    void deleteByZimmerNummer(Integer zimmerNummer);
}
