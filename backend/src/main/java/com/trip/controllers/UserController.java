package com.trip.controllers;

import com.trip.config.requests.ChangePasswordRequest;
import com.trip.entities.course.Course;
import com.trip.entities.user.User;
import com.trip.repositories.UserRepository;
import com.trip.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "User")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService service;

    private final UserRepository userRepository;

    @Value("${project.image}")
    private String path;

    @PatchMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses(Principal principal) {
        List<Course> courses = service.getCourses(principal.getName());
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/aadhaar")
    public ResponseEntity<InputStreamResource> downloadFile(Principal principal) throws IOException {
        User user = userRepository.findByEmail(principal.getName()).get();
        if (user != null && user.getAadhaarCard() != null) {
            String filePath = path + user.getAadhaarCard();
            File file = new File(filePath);
            if (file.exists()) {
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
                headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                return ResponseEntity.ok().headers(headers).body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
