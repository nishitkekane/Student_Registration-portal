package com.trip.entities.examination;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Builder
@Table(name = "exams")
public class Exam {

    @Id
    private String courseId;

    private Type type;

    private LocalDate date;

    public Exam() {
    }

    public Exam(String courseId, Type type, LocalDate date) {
        this.courseId = courseId;
        this.type = type;
        this.date = date;
    }
}
