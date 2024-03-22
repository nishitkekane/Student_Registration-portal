package com.trip.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SenderService {

    private final EmailSenderService emailSenderService;

    public void sendPassword(String email, String password) {
        final String receiverMessage = "Greeting From College! Here is your password for login:" + password;
        emailSenderService.sendEmail(new EmailNotification(email, "ACCOUNT VERIFICATION", receiverMessage));
    }
}
