package com.trip.controllers;

import com.trip.config.requests.ChangePasswordRequest;
import com.trip.entities.course.Course;
import com.trip.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "User")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService service;

    @PatchMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses(Principal principal){
        List<Course> courses = service.getCourses(principal.getName());
        return ResponseEntity.ok(courses);
    }
}

