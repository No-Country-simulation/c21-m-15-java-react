package com.noCountry.backend.medic;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MedicServiceTest {

    @InjectMocks
    private MedicService medicService;
    @Mock
    private MedicRepository repository;
    @Mock
    private MedicMapper mapper;

    @Test
    public void testGetMedics_withSpeciality() {
        Medic medic = new Medic();
        medic.setSpeciality("Pediatría");
        MedicResponse response = new MedicResponse(103, "Dra. Bejarano Gisela", "/imagenes/pediatra1.jpg", "Pediatría", "description", Collections.emptyList());

        when(repository.findAllBySpeciality("Pediatría")).thenReturn(List.of(medic));
        when(mapper.toMedicResponse(medic)).thenReturn(response);

        List<MedicResponse> result = medicService.getMedics("Pediatría");

        assertEquals(1, result.size());
        assertEquals("Pediatría", result.get(0).speciality());
    }

    @Test
    public void getMedics_withoutSpeciality() {
        Medic medic = new Medic();
        medic.setSpeciality("Pediatría");
        MedicResponse response = new MedicResponse(103, "Dra. Bejarano Gisela", "/imagenes/pediatra1.jpg", "Pediatría", "description", Collections.emptyList());

        when(repository.findAll()).thenReturn(Arrays.asList(medic));
        when(mapper.toMedicResponse(medic)).thenReturn(response);

        List<MedicResponse> result = medicService.getMedics(null);

        assertEquals(1, result.size());
        assertEquals("Pediatría", result.get(0).speciality());
    }
}