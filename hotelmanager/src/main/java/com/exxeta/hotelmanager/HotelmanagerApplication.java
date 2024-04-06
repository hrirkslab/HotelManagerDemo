package com.exxeta.hotelmanager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.exxeta.hotelmanager")
@EntityScan("com.exxeta.hotelmanager")
public class HotelmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelmanagerApplication.class, args);
	}

	@Bean
    public CommandLineRunner demo(HotelzimmerRepository repository) {
        return (args) -> {
            
            // Eines besitzt eine Minibar und ist ein Doppelzimmer
            Hotelzimmer doubleRoomWithMinibar = new Hotelzimmer();
            doubleRoomWithMinibar.setZimmerNummer(101); 
            doubleRoomWithMinibar.setZimmergroesse(Hotelzimmer.Zimmergroesse.DOPPELZIMMER);
            doubleRoomWithMinibar.setMinibar(true);
            doubleRoomWithMinibar.setIsAvailable(false);
            repository.save(doubleRoomWithMinibar);

            // Eines besitzt eine Minibar und ist ein Einzelzimmer
            Hotelzimmer singleRoomWithMinibar = new Hotelzimmer();
            singleRoomWithMinibar.setZimmerNummer(102); 
            singleRoomWithMinibar.setZimmergroesse(Hotelzimmer.Zimmergroesse.EINZELZIMMER);
            singleRoomWithMinibar.setMinibar(true);
            singleRoomWithMinibar.setIsAvailable(true);
            repository.save(singleRoomWithMinibar);

            // Eines besitzt keine Minibar und ist eine Suite
            Hotelzimmer suiteWithoutMinibar = new Hotelzimmer();
            suiteWithoutMinibar.setZimmerNummer(103);
            suiteWithoutMinibar.setZimmergroesse(Hotelzimmer.Zimmergroesse.SUITE);
            suiteWithoutMinibar.setMinibar(false);
            suiteWithoutMinibar.setIsAvailable(true);
            repository.save(suiteWithoutMinibar);
        };
    }

}
