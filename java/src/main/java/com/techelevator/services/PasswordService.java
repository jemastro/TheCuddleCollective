package com.techelevator.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String generateTempPassword() {
        return RandomStringUtils.randomAlphanumeric(10);
    }

    public String hashPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean verifyPassword(String rawPassword, String hashed) {
        return encoder.matches(rawPassword, hashed);
    }
}
