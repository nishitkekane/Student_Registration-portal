package com.trip.controllers;

import com.itextpdf.text.DocumentException;
import com.trip.config.requests.RegisterExam;
import com.trip.entities.examination.Exam;
import com.trip.services.ExamService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/exam")
@RequiredArgsConstructor
@Tag(name = "Exams")
public class ExamController {

    private final ExamService examService;

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerExam(@RequestBody RegisterExam request) {
        Exam exam = examService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(exam);
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getExam(@RequestParam String id) {
        Exam exam = examService.getExam(id);
        return ResponseEntity.ok(exam);
    }

    @PostMapping(value = "/ticket", produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getTicket(Principal principal) throws DocumentException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("inline").filename("transaction_report.pdf").build());

        ByteArrayOutputStream outputStream = examService.generateHallTicket(principal.getName());
        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}
