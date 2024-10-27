package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MedicalRecordServiceTest {

    @InjectMocks
    private MedicalRecordService service;
    @Mock
    private MedicalRecordRepository medicalRecordRepository;
    @Mock
    private PatientRepository patientRepository;
    @Mock
    private MedicalRecordMapper mapper;

    @Test
    @WithMockUser(roles = "MEDIC")
    public void getMedicalRecordsByPatient() {
        Patient patient = new Patient();
        patient.setId(201L);

        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(patient);
        MedicalRecordResponse medicalRecordResponse = new MedicalRecordResponse(1, 201L, "Hipertensión", LocalDate.of(2023,1,15), "Medicación", "Monitorear la presión arterial regularmente");

        when(patientRepository.findById(201L)).thenReturn(Optional.of(patient));
        when(medicalRecordRepository.findByPatient(patient)).thenReturn(List.of(medicalRecord));
        when(mapper.toResponse(medicalRecord)).thenReturn(medicalRecordResponse);

        List<MedicalRecordResponse> result = service.getMedicalRecordsByPatient(201);

        assertEquals(1, result.size());
        assertEquals(medicalRecordResponse, result.get(0));
    }
}