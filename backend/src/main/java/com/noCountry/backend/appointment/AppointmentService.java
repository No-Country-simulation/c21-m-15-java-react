package com.noCountry.backend.appointment;

import com.noCountry.backend.exception.AppointmentAlreadyBookedException;
import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.medic.MedicRepository;
import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final MedicRepository medicRepository;
    private final AppointmentMapper mapper;

//    public List<AppointmentResponse> getAppointmentsByMedic(Medic medicById) {
//        return appointmentRepository.findByMedic(medicById)
//                .stream()
//                .map(mapper::toAppointmentResponse)
//                .toList();
//    }
//
//    public List<AppointmentResponse> getAppointmentsByPatient(Patient patientById) {
//        return appointmentRepository.findByPatient(patientById)
//                .stream()
//                .map(mapper::toAppointmentResponse)
//                .toList();
//    }

    public List<AppointmentResponse> getAppointmentsByMedicAndIsBooked(long medicId, boolean isBooked) {
        Medic medic = medicRepository.findById(medicId)
                .orElseThrow(() -> new EntityNotFoundException("Médico no encontrado"));

        return appointmentRepository.findByMedicAndIsBooked(medic, isBooked)
                .stream()
                .map(mapper::toAppointmentResponse)
                .toList();
    }

    public List<AppointmentResponse> getBookedAppointmentsByPatient(long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado"));

        return appointmentRepository.findByPatientAndIsBooked(patient, true)
                .stream()
                .map(mapper::toAppointmentResponse)
                .toList();
    }

    public AppointmentResponse updateAppointment(AppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("Cita no encontrada"));

        if (appointment.isBooked()) {
            throw new AppointmentAlreadyBookedException("No se puede reservar cita reservada");
        }

        Patient patient = patientRepository.findById(request.patientId())
                .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado"));

        appointment.setPatient(patient);
        appointment.setNotes(request.notes());
        appointment.setBooked(true);
        appointmentRepository.save(appointment);

        return mapper.toAppointmentResponse(appointment);
    }
}
