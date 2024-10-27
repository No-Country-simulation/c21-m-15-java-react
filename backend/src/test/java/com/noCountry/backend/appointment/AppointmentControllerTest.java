package com.noCountry.backend.appointment;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@SpringBootTest
@AutoConfigureMockMvc
public class AppointmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentService appointmentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    public void testGetAppointmentsByMedicId() throws Exception {
        AppointmentResponse response = new AppointmentResponse(1, 0, 101L, LocalDateTime.of(2024, 10, 21, 9, 0, 0), false, "");

        when(appointmentService.getAppointmentsByMedicAndIsBooked(101L, false)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/medics/101/appointments")
                .param("isBooked", "false")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));
    }

    @Test
    @WithMockUser(roles = "MEDIC")
    public void testGetAppointmentsByPatientId() throws Exception {
        AppointmentResponse response = new AppointmentResponse(1, 201L, 101L, LocalDateTime.of(2024, 10, 21, 9, 0, 0), false, "");

        when(appointmentService.getBookedAppointmentsByPatient(201L)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/patients/201/appointments")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));
    }

    @Test
    @WithMockUser
    public void testBookAppointment() throws Exception {
        AppointmentResponse response = new AppointmentResponse(1L, 201L, 101L, LocalDateTime.of(2024, 10, 21, 9, 0, 0), false, "");
        AppointmentRequest request = new AppointmentRequest(1L, 201L, "");

        when(appointmentService.updateAppointment(request)).thenReturn(response);

        mockMvc.perform(put("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    @WithMockUser(roles = "MEDIC")
    public void testGenerateAppointments() throws Exception {
        mockMvc.perform(get("/api/appointments/generate")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Citas generadas exitosamente"));
    }

    @Test
    @WithMockUser(roles = "MEDIC")
    public void testDeleteUnbookedPastAppointments() throws Exception {
        mockMvc.perform(delete("/api/appointments/past-unbooked"))
                .andExpect(status().isOk())
                .andExpect(content().string("Citas pasadas y no reservadas borradas exitosamente"));
    }
}