package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.MedicService;
import com.noCountry.backend.patient.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Obtener las citas reservados o no reservadas de un medico
    @GetMapping("/medics/{id}/appointments")
    public ResponseEntity<?> getAppointmentsByMedicId(@RequestParam(required= false, defaultValue = "false") boolean isBooked,
                                                      @PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByMedicAndIsBooked(id, isBooked));
    }

    // Obtener todas las citas de un paciente
    @GetMapping("/patients/{id}/appointments")
    public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getBookedAppointmentsByPatient(id));
    }

    // Reservar una cita
    @PutMapping("/medics/{id}/appointments")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest appointment){
        return ResponseEntity.ok(appointmentService.updateAppointment(appointment));
    }
}
