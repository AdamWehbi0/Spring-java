package com.example.student_Management;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return this.studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentOptional = this.studentRepository.findStudentByEmail(student.getEmail());
        if (studentOptional.isPresent()) {
            throw new IllegalStateException("Email is taken");
        } else {
            this.studentRepository.save(student);
        }
    }

    public void deleteStudent(Long studentId) {
        boolean exists = this.studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("Student does not exist");
        } else {
            this.studentRepository.deleteById(studentId);
        }
    }

    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        boolean exists = this.studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("Student does not exist");
        } else {
            Student student = (Student)this.studentRepository.findById(studentId).get();
            if (name != null && name.length() > 0 && !Objects.equals(student.getName(), name)) {
                student.setName(name);
            }

            if (email != null && email.length() > 0 && !Objects.equals(student.getEmail(), email)) {
                Optional<Student> studentOptional = this.studentRepository.findStudentByEmail(email);
                if (studentOptional.isPresent()) {
                    throw new IllegalStateException("Email is taken");
                }

                student.setEmail(email);
            }

            this.studentRepository.save(student);
        }
    }
}

