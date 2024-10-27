package com.noCountry.backend.appointment;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Obtener las citas reservados o no reservadas de un medico
    @GetMapping("/medics/{id}/appointments")
    @PreAuthorize("#isBooked == false or #id == authentication.principal.id")
    public ResponseEntity<?> getAppointmentsByMedicId(@RequestParam(required= false, defaultValue = "false") boolean isBooked,
                                                      @PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByMedicAndIsBooked(id, isBooked));
    }

    // Obtener todas las citas de un paciente
    @GetMapping("/patients/{id}/appointments")
    @PreAuthorize("hasRole('MEDIC') or #id == authentication.principal.id")
    public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getBookedAppointmentsByPatient(id));
    }

    // Reservar una cita
    @PutMapping("/appointments")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest appointment){
        return ResponseEntity.ok(appointmentService.updateAppointment(appointment));
    }

    // Generar citas de todos los médicos manualmente
    @GetMapping("/appointments/generate")
    @PreAuthorize("hasRole('MEDIC')")
    public ResponseEntity<?> generateAppointments() {
        appointmentService.generateAppointments();
        return ResponseEntity.ok("Citas generadas exitosamente");
    }

    // Borrar citas pasadas y no reservadas de todos los médicos manualmente
    @DeleteMapping("/appointments/past-unbooked")
    @PreAuthorize("hasRole('MEDIC')")
    public ResponseEntity<?> deleteUnbookedPastAppointments() {
        appointmentService.deleteUnbookedPastAppointments();
        return ResponseEntity.ok("Citas pasadas y no reservadas borradas exitosamente");
    }
}
