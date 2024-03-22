package com.trip.services;

import com.trip.config.requests.ChangePasswordRequest;
import com.trip.entities.course.Course;
import com.trip.entities.user.User;
import com.trip.repositories.CourseRepository;
import com.trip.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository repository;

    private final CourseRepository courseRepository;
    
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Check if the current password is correct.
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong Password!");
        }

        // Check if the two new passwords are the same.
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the Same!");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);
    }

    public List<Course> getCourses(String name){
        List<Course> courses = courseRepository.findAll();
        List<Course> enrolledCourses = new ArrayList<>();

        for(Course course : courses){
            for(String email: course.getStudents()){
                if(email.equals(name)) enrolledCourses.add(course);
                break;
            }
        }
        return enrolledCourses;
    }
}
