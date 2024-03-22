package com.trip.controllers;

import com.trip.config.requests.RegisterRequest;
import com.trip.services.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/register")
@RequiredArgsConstructor
@Tag(name = "Register")
public class RegisterController {

    private final AuthenticationService service;

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
}
