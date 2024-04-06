package com.exxeta.hotelmanager;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Hotelzimmer {

    @Id
    private Integer zimmerNummer;

    public enum Zimmergroesse {
        EINZELZIMMER, 
        DOPPELZIMMER, 
        SUITE         
    }

    @Enumerated(EnumType.STRING)
    private Zimmergroesse zimmergroesse; 

    private boolean minibar; 

    private boolean isAvailable;

    // Constructors, getters, and setters
    public Hotelzimmer() {
    }

    public Hotelzimmer(Integer zimmerNummer, Zimmergroesse zimmergroesse, boolean minibar) {
        this.zimmerNummer = zimmerNummer;
        this.zimmergroesse = zimmergroesse;
        this.minibar = minibar;
    }

    public Integer getZimmerNummer() {
        return zimmerNummer;
    }

    public void setZimmerNummer(Integer zimmerNummer) {
        this.zimmerNummer = zimmerNummer;
    }

    public Zimmergroesse getZimmergroesse() {
        return zimmergroesse;
    }

    public void setZimmergroesse(Zimmergroesse zimmergroesse) {
        this.zimmergroesse = zimmergroesse;
    }

    public boolean isMinibar() {
        return minibar;
    }

    public void setMinibar(boolean minibar) {
        this.minibar = minibar;
    }

    public boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
