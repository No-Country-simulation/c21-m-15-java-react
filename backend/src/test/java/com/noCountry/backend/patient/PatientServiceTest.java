package com.noCountry.backend.patient;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTest {

    @InjectMocks
    private PatientService service;
    @Mock
    private PatientRepository repository;
    @Mock
    private PatientMapper mapper;

    @Test
    public void testGetPatientById() {
        Patient patient = new Patient();
        patient.setId(201L);
        PatientResponse response = new PatientResponse(201L, "Alice", "Brown", "alice.brown@example.com", "456-789-0123");

        when(repository.findById(201L)).thenReturn(Optional.of(patient));
        when(mapper.toPatientResponse(patient)).thenReturn(response);

        PatientResponse result = service.getPatientById(201L);

        assertEquals(response, result);
    }
}