package com.trip.config.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VerifyEmailRequest {
    private Integer otp;

    public VerifyEmailRequest(Integer otp) {
        this.otp = otp;
    }
}
