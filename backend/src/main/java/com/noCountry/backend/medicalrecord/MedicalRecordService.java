package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.Patient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;

    // Consultar registros medicos de un paciente a partir de su ID
    public List<MedicalRecord> getMedicalRecordsByPatient(Patient patientById) {
        return medicalRecordRepository.findByPatient(patientById);
    }
}
