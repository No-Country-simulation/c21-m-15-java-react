package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientService patientService;

    // Consultar registros medicos de un paciente a partir de su ID
    public List<MedicalRecord> getMedicalRecordsByPatient(long id) {
        return medicalRecordRepository.findByPatient(patientService.getPatientById(id));
    }
}
