package com.noCountry.backend.medicalrecord;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MedicalRecordControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MedicalRecordService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "MEDIC")
    public void testGetMedicalRecordsByPatientId() throws Exception {
        MedicalRecordResponse response = new MedicalRecordResponse(1, 201L, "Hipertensión", LocalDate.of(2023,1,15), "Medicación", "Monitorear la presión arterial regularmente");

        when(service.getMedicalRecordsByPatient(201L)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/patients/201/medical-records")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));
    }
}