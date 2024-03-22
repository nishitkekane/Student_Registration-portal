package com.trip.services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class GeneratePassword {

    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String SPECIAL_CHAR = "!@#$%&*()_+-=[]?";
    private static final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER + SPECIAL_CHAR;
    private static final SecureRandom random = new SecureRandom();

    public String generatePassword(int length) {
        if (length < 4) throw new IllegalArgumentException("Password length must be at least 4 characters.");
        StringBuilder password = new StringBuilder(length);
        password.append(randomChar(CHAR_LOWER));
        password.append(randomChar(CHAR_UPPER));
        password.append(randomChar(NUMBER));
        password.append(randomChar(SPECIAL_CHAR));

        for (int i = 4; i < length; i++) {
            password.append(randomChar(PASSWORD_ALLOW_BASE));
        }

        return shuffleString(password.toString());
    }

    private static char randomChar(String charSet) {
        int randomIndex = random.nextInt(charSet.length());
        return charSet.charAt(randomIndex);
    }

    private static String shuffleString(String input) {
        char[] characters = input.toCharArray();
        for (int i = 0; i < characters.length; i++) {
            int randomIndex = random.nextInt(characters.length);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }
        return new String(characters);
    }
}
