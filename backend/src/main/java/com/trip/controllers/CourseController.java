package com.trip.controllers;

import com.itextpdf.text.DocumentException;
import com.trip.config.requests.RegisterCourse;
import com.trip.entities.course.Course;
import com.trip.services.CourseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/course")
@RequiredArgsConstructor
@Tag(name = "Courses")
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/register")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> registerCourse(@RequestBody RegisterCourse request, Principal principal) {
        Course course = courseService.registerCourse(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(course);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCourse(@RequestParam String id) {
        Course course = courseService.getCourse(id);
        return ResponseEntity.ok(course);
    }

    @PatchMapping("/enroll")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> enroll(@RequestParam String id, Principal principal) {
        boolean enrolled = courseService.enroll(id, principal.getName());
        if(enrolled) {
            return ResponseEntity.ok("Student Enrolled Successfully!");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Enrolled!");
        }
    }

    @PostMapping(value = "/attendance", produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<byte[]> generateTransactionStatement(@RequestParam String id) throws DocumentException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("inline").filename("transaction_report.pdf").build());

        ByteArrayOutputStream outputStream = courseService.generateAttendance(id);
        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}
