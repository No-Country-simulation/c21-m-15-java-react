package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/medic")
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;
    private final PatientService patientService;

    // Obtener registros medicos de un paciente
    @GetMapping("/patients/{id}/medical-records")
    public ResponseEntity<?> getMedicalRecordsByPatientId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(medicalRecordService.getMedicalRecordsByPatient(patientService.getPatientById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener los registros medicos");
        }
    }
}
