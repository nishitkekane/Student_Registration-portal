package com.trip.controllers;

import com.trip.config.requests.RegisterRequest;
import com.trip.services.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/register")
@RequiredArgsConstructor
@Tag(name = "Register")
public class RegisterController {

    private final AuthenticationService service;

    @Value("${project.image}")
    private String path;

    @PostMapping("/teacher")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerTeacher(@RequestBody RegisterRequest request) {
        service.register(request, true);
        return ResponseEntity.ok("Teacher has been created!");
    }

    @PostMapping("/student")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest request) {
        service.register(request, false);
        return ResponseEntity.ok("Student successfully created!");
    }

    @PostMapping("/upload-aadhaar")
    public ResponseEntity<?> uploadAadhaar(@RequestParam("aadhar") MultipartFile image,
            @RequestParam("email") String email)
            throws IOException {
        service.uploadAadhaar(path, image, email);
        return ResponseEntity.ok("File uploaded successfully!");
    }

    @PostMapping("/upload-marksheet")
    public ResponseEntity<?> uploadMarkSheet(@RequestParam("marksheet") MultipartFile image,
            @RequestParam("email") String email)
            throws IOException {
        service.uploadAadhaar(path, image, email);
        return ResponseEntity.ok("File uploaded successfully!");
    }
}
