package com.trip.config.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trip.entities.user.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    private Role role;
}
