package com.trip.config.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountNotActiveResponse {

    String message;
}
