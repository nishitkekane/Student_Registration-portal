package com.trip.config.requests;

import com.trip.entities.user.Department;
import com.trip.entities.user.Role;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    private String firstname;

    private String lastname;

    private String email;

    private Department department;

    private String address;

    private Integer aadhaarNo;

    private char gender;
}
