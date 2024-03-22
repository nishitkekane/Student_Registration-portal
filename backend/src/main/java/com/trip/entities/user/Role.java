package com.trip.entities.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_DELETE,
                    Permission.ADMIN_CREATE,
                    Permission.TEACHER_READ,
                    Permission.TEACHER_UPDATE,
                    Permission.TEACHER_DELETE,
                    Permission.TEACHER_CREATE
            )
    ),
    TEACHER(
            Set.of(
                    Permission.TEACHER_READ,
                    Permission.TEACHER_UPDATE,
                    Permission.TEACHER_DELETE,
                    Permission.TEACHER_CREATE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        // Creating the Permissions.
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}

