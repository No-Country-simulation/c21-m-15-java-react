package com.noCountry.backend.medic;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/medics")
public class MedicController {

    private final MedicService medicService;

    // Obtener todos los medicos por especialidad o no
    @GetMapping
    public ResponseEntity<?> getMedics(@RequestParam(required = false) String speciality) {
        try {
            List<MedicResponse> medics = medicService.getMedics(speciality);
            return ResponseEntity.ok(medics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener los medicos");
        }
    }
}
