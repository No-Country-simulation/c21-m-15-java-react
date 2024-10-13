package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.patient.Patient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public List<Appointment> getAppointmentsByMedic(Medic medicById) {
        return appointmentRepository.findByMedic(medicById);
    }

    public List<Appointment> getAppointmentsByPatient(Patient patientById) {
        return appointmentRepository.findByPatient(patientById);
    }
}
