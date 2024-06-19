package com.example.student_Management;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(
        name = "student"
)
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String name;
    private LocalDate dob;
    private String email;
    @Transient
    private Integer age;

    public Student() {
    }

    public Student(String email, LocalDate dob, String name, Long id) {
        this.email = email;
        this.dob = dob;
        this.name = name;
        this.id = id;
    }

    public Student(String email, LocalDate dob, String name) {
        this.email = email;
        this.dob = dob;
        this.name = name;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return this.dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String toString() {
        Long var10000 = this.id;
        return "Student{id=" + var10000 + ", name='" + this.name + "', dob=" + String.valueOf(this.dob) + ", age=" + this.age + ", email='" + this.email + "'}";
    }
}
