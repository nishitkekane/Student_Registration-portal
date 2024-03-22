package com.trip.entities.user;

import com.trip.entities.token.Token;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Builder
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;

    private String firstname;

    private String lastname;

    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Department department;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    @Column(length = 100)
    private String address;

    @Column(length = 12)
    private Integer aadhaarNo;

    private char gender;

    @Enumerated(EnumType.STRING)
    private Year year;

    private String aadhaarCard;

    private String marksheet;

    public User(Integer id, String firstname, String lastname, String email, Department department, String password,
            Role role, List<Token> tokens, String address, Integer aadhaarNo, char gender, Year year,
            String aadhaarCard, String marksheet) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.department = department;
        this.password = password;
        this.role = role;
        this.tokens = tokens;
        this.address = address;
        this.aadhaarNo = aadhaarNo;
        this.gender = gender;
        this.year = year;
        this.aadhaarCard = aadhaarCard;
        this.marksheet = marksheet;
    }

    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
