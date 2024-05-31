package com.example.doan2;

import com.example.doan2.entity.Product;
import com.example.doan2.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class Doan2Application {

	public static void main(String[] args) {
		SpringApplication.run(Doan2Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ProductRepository productRepository){
		return args -> {
			productRepository.save(Product.builder()
					.id(UUID.randomUUID().toString())
					.name("Giai tich")
					.price(2400)
					.quantity(4)
					.build()
			);
      productRepository.save(Product.builder()
        .id(UUID.randomUUID().toString())
        .name("Dai sp")
        .price(3000)
        .quantity(5)
        .build()
      );
		};
	}
}
