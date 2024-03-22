package com.trip.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trip.config.requests.AuthenticationRequest;
import com.trip.config.requests.RegisterRequest;
import com.trip.config.responses.AuthenticationResponse;
import com.trip.entities.token.Token;
import com.trip.entities.token.TokenType;
import com.trip.entities.user.Role;
import com.trip.entities.user.User;
import com.trip.mail.SenderService;
import com.trip.repositories.TokenRepository;
import com.trip.repositories.UserRepository;
import com.trip.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;

    private final TokenRepository tokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final SenderService senderService;

    private final GeneratePassword generatePassword;

    /**
     * Register the User.
     */
    public void register(RegisterRequest request, boolean isTeacher) {
        String password = generatePassword.generatePassword(8);

        // Creating the user.
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .department(request.getDepartment())
                .password(passwordEncoder.encode(password))
                .role(isTeacher ? Role.TEACHER : Role.USER)
                .build();

        // Saving And Generating the User.
        repository.save(user);

        // Sending the Mail.
        sendMail(request.getEmail(), password);
    }

    public void sendMail(String email, String password) {
        senderService.sendPassword(email, password);
    }

    public Integer generateID() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }

    /**
     * Authenticate the User.
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // Finding the User For Generating the Token.
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }

    /**
     * Method to save the token.
     */
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    /**
     * Methods for setting previous token to be expired.
     */
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    /**
     * Method For Refreshing the Token.
     */
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        // Checking for the Tokens.
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return;
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail).orElseThrow();

            // If Valid Token, Creating new And Revoking Others.
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                // Advance Stuff.
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
