package com.noCountry.backend.auth;

import com.noCountry.backend.jwt.JwtService;
import com.noCountry.backend.user.User;
import com.noCountry.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.naming.AuthenticationException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @InjectMocks
    private AuthService service;
    @Mock
    private UserRepository userRepository;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    public void testLogin() {
        User user = new User();
        user.setUsername("alice_brown");

        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZV9icm93biIsImlhdCI6MTczMDAwNzc4MiwiZXhwIjoxNzMwMDA5MjIyfQ.-D32fTgeNzUkKR1qBN76KG1o-pDU9M7YapV5iF_FNQw";

        LoginRequest request = new LoginRequest("alice_brown", "123");

        when(userRepository.findByUsername("alice_brown")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn(token);

        AuthResponse authResponse = service.login(request);

        assertEquals(token, authResponse.getToken());
    }

    @Test
    public void testLogin_UserNotFound() {
        LoginRequest request = new LoginRequest("alice_brown", "123");

        when(userRepository.findByUsername("alice_brown")).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () ->
                service.login(request));

        assertEquals("Usuario no encontrado", exception.getMessage());
    }

    @Test
    public void testLogin_InvalidCredentials() {
        LoginRequest request = new LoginRequest("alice_brow", "123");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken("alice_brow", "123");

        when(authenticationManager.authenticate(token)).thenThrow(BadCredentialsException.class);

        assertThrows(BadCredentialsException.class, () ->
                service.login(request));
    }
}