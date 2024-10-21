package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import com.noCountry.backend.patient.PatientService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final MedicalRecordMapper mapper;

    // Consultar registros medicos de un paciente a partir de su ID
    public List<MedicalRecordResponse> getMedicalRecordsByPatient(long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado"));
        return medicalRecordRepository.findByPatient(patient)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
