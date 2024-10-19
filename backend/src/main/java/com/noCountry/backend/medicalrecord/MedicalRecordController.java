package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    // Obtener registros medicos de un paciente
    @GetMapping("/patients/{id}/medical-records")
    @PreAuthorize("hasRole('MEDIC') or #id == authentication.principal.id")
    public ResponseEntity<?> getMedicalRecordsByPatientId(@PathVariable Long id) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordsByPatient(id));
    }
}
