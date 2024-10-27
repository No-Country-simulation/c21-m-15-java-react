package com.noCountry.backend.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService service;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    public void testLogin() throws Exception {
        LoginRequest request = new LoginRequest("alice_brown", "123");
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZV9icm93biIsImlhdCI6MTczMDAwNzc4MiwiZXhwIjoxNzMwMDA5MjIyfQ.-D32fTgeNzUkKR1qBN76KG1o-pDU9M7YapV5iF_FNQw";
        AuthResponse response = new AuthResponse(token);

        when(service.login(request)).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void testLogin_InvalidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("alice_brow", "123");

        when(service.login(request)).thenThrow(BadCredentialsException.class);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Usuario o contraseña incorrectos"));
    }
}