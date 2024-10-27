package com.noCountry.backend.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    // Obtener paciente por id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MEDIC') or #id == authentication.principal.id")
    public ResponseEntity<?> getPatientById (@PathVariable long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }
}
