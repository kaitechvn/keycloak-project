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
    String img1 = "assets/giaitich.jpg";
    String img2 = "assets/daiso.jpg";

		return args -> {
			productRepository.save(Product.builder()
					.id("1")
					.name("Giải tích ")
					.price(2400)
					.quantity(4)
          .image(img1)
					.build()
			);
      productRepository.save(Product.builder()
        .id("2")
        .name("Đại số")
        .price(3000)
        .quantity(5)
        .image (img2)
        .build()
      );
		};
	}
}
