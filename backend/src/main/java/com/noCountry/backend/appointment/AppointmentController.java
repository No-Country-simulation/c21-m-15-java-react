package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.MedicService;
import com.noCountry.backend.patient.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final MedicService medicService;
    private final PatientService patientService;

    // Obtener todas las citas de un medico
    @GetMapping("/all/medic/{id}")
    public ResponseEntity<?> getAppointmentsByMedicId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(appointmentService.getAppointmentsByMedic(medicService.getMedicById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener las citas");
        }
    }

    // Obtener todas las citas de un paciente
    @GetMapping("/all/patient/{id}")
    public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(patientService.getPatientById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener las citas");
        }
    }
}
