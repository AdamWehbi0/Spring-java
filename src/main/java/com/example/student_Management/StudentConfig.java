package com.example.student_Management;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {
    public StudentConfig() {
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return (args) -> {
            Student adam = new Student(
                    "Adamwehbi0@Gmail.com",
                    LocalDate.of(2004, Month.NOVEMBER, 24),
                    "Adam");

            Student brad = new Student("Brad@gmail.com",
                    LocalDate.of(2004, Month.JUNE, 2),
                    "Brady");

            repository.saveAll(List.of(adam, brad));
        };
    }
}
