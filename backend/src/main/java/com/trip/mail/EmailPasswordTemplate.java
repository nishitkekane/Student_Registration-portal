package com.trip.mail;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailPasswordTemplate {

    public String receiverEmailAddress;

    public String password;
}
