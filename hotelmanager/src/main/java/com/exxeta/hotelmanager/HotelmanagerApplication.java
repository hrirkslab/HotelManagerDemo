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
            Hotelzimmer newRoom = new Hotelzimmer();
            newRoom.setZimmerNummer(101);
            newRoom.setZimmergroesse(Hotelzimmer.Zimmergroesse.EINZELZIMMER);
            newRoom.setMinibar(false);
            repository.save(newRoom);
        };
    }

}
