package com.trip.mail;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailNotification {

    private String receiverEmail;

    private String subject;

    private String message;
}
