package com.trip.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class GmailSenderService implements EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public void sendEmail(EmailNotification emailNotification) {
        try {
            SimpleMailMessage emailMessage = new SimpleMailMessage();
            emailMessage.setFrom(sender);
            emailMessage.setTo(emailNotification.getReceiverEmail());
            emailMessage.setSubject(emailNotification.getSubject());
            emailMessage.setText(emailNotification.getMessage());
            mailSender.send(emailMessage);
        } catch (MailException e) {
            System.out.println(e.getMessage());
        }
    }
}
