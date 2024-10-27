package com.noCountry.backend.medic;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class MedicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MedicService medicService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetMedics_withSpeciality()  throws Exception {
        MedicResponse response = new MedicResponse(103, "Dra. Bejarano Gisela", "/imagenes/pediatra1.jpg", "Pediatría", "description", Collections.emptyList());

        when(medicService.getMedics("Pediatría")).thenReturn(List.of(response));

        mockMvc.perform(get("/api/medics")
                .param("speciality", "Pediatría")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));
    }

    @Test
    public void testGetMedics_withoutSpeciality()  throws Exception {
        MedicResponse response = new MedicResponse(103, "Dra. Bejarano Gisela", "/imagenes/pediatra1.jpg", "Pediatría", "description", Collections.emptyList());

        when(medicService.getMedics(null)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/medics")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));
    }

}