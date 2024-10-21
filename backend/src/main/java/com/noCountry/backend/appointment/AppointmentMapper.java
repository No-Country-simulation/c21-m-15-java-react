package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.MedicRepository;
import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentMapper {

    private final PatientRepository patientRepository;
    private final MedicRepository medicRepository;
    private final AppointmentRepository appointmentRepository;

    public Appointment toAppointment(AppointmentRequest request){
        Appointment appointment = appointmentRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("Cita no encontrada"));
        Patient patient = patientRepository.findById(request.patientId())
                .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado"));

        appointment.setPatient(patient);
        appointment.setNotes(request.notes());

        return appointment;
    }

    public AppointmentResponse toAppointmentResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatient().getId(),
                appointment.getMedic().getId(),
                appointment.getStartDateTime(),
                appointment.isBooked(),
                appointment.getNotes()
        );
    }

    public AppointmentResponse toNonBookedAppointmentResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                0,
                appointment.getMedic().getId(),
                appointment.getStartDateTime(),
                appointment.isBooked(),
                ""
        );
    }
}
