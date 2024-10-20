package com.noCountry.backend.appointment;

import com.noCountry.backend.exception.AppointmentAlreadyBookedException;
import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.medic.MedicRepository;
import com.noCountry.backend.openingHour.OpeningHour;
import com.noCountry.backend.openingHour.OpeningHourRepository;
import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final MedicRepository medicRepository;
    private final OpeningHourRepository openingHourRepository;
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
                .map(appointment -> {
                    if(isBooked)
                        return mapper.toAppointmentResponse(appointment);
                    return mapper.toNonBookedAppointmentResponse(appointment);})
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

    @Scheduled(cron = "0 0 1 * * *")
    public void generateAppointments() {
        LocalDate starDate = LocalDate.now();
        LocalDate endDate = starDate.plusWeeks(2);

        List<OpeningHour> openingHours = openingHourRepository.findAll();

        for(OpeningHour openingHour : openingHours) {
            LocalDate currentDate = starDate;

            while (currentDate.isBefore(endDate)) {
                if(currentDate.getDayOfWeek() == openingHour.getDayOfWeek()) {
                    LocalTime currentTime = openingHour.getStartTime();
                    while (currentTime.isBefore(openingHour.getEndTime())) {
                        Appointment appointment = Appointment.builder()
                                .medic(openingHour.getMedic())
                                .startDateTime(LocalDateTime.of(currentDate, currentTime))
                                .build();

                        appointmentRepository.save(appointment);
                        currentTime = currentTime.plusHours(1);
                    }
                    currentDate = currentDate.plusWeeks(1);
                }
                else
                    currentDate = currentDate.plusDays(1);
            }
        }
    }
}
