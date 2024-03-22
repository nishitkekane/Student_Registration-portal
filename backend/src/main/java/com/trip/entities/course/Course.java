package com.trip.entities.course;

import com.trip.entities.user.Department;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Builder
@Table(name = "courses")
public class Course {

    @Id
    @Column(unique = true)
    private String courseId;

    private String name;

    private String faculty;

    private Double hoursWeek;

    private Double credit;

    private List<String> students;

    @Enumerated(EnumType.STRING)
    private Department department;

    public Course() {
    }

    public Course(String courseId, String name, String faculty, Double hoursWeek, Double credit, List<String> students,
            Department department) {
        this.courseId = courseId;
        this.name = name;
        this.faculty = faculty;
        this.hoursWeek = hoursWeek;
        this.credit = credit;
        this.students = students;
        this.department = department;
    }
}
