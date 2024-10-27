package com.noCountry.backend.appointment;

import com.noCountry.backend.exception.AppointmentAlreadyBookedException;
import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.medic.MedicRepository;
import com.noCountry.backend.medic.MedicResponse;
import com.noCountry.backend.openingHour.OpeningHour;
import com.noCountry.backend.openingHour.OpeningHourRepository;
import com.noCountry.backend.patient.Patient;
import com.noCountry.backend.patient.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AppointmentServiceTest {

    @InjectMocks
    private AppointmentService service;
    @Mock
    private MedicRepository medicRepository;
    @Mock
    private AppointmentRepository appointmentRepository;
    @Mock
    private PatientRepository patientRepository;
    @Mock
    private OpeningHourRepository openingHourRepository;
    @Mock
    private AppointmentMapper mapper;

    @Test
    public void testGetAppointmentsByMedicAndIsBooked() {
        Medic medic = new Medic();
        medic.setId(101L);

        Appointment appointment = new Appointment();
        appointment.setBooked(true);
        AppointmentResponse appointmentResponse = new AppointmentResponse(1, 201L, 101L, LocalDateTime.now(), true, "");

        when(medicRepository.findById(101L)).thenReturn(Optional.of(medic));
        when(appointmentRepository.findByMedicAndIsBooked(medic, true)).thenReturn(List.of(appointment));
        when(mapper.toAppointmentResponse(appointment)).thenReturn(appointmentResponse);

        List<AppointmentResponse> result = service.getAppointmentsByMedicAndIsBooked(101L, true);

        assertEquals(1, result.size());
        assertEquals(appointmentResponse, result.get(0));
    }

    @Test
    public void testGetAppointmentsByMedicAndIsBooked_notFound() {
        when(medicRepository.findById(101L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () ->
                service.getAppointmentsByMedicAndIsBooked(101L, true));

        assertEquals("Médico no encontrado", exception.getMessage());
    }

    @Test
    public void testGetBookedAppointmentsByPatient() {
        Patient patient = new Patient();
        patient.setId(201L);

        Appointment appointment = new Appointment();
        appointment.setBooked(true);
        AppointmentResponse appointmentResponse = new AppointmentResponse(1, 201L, 101L, LocalDateTime.now(), true, "");

        when(patientRepository.findById(201L)).thenReturn(Optional.of(patient));
        when(appointmentRepository.findByPatientAndIsBooked(patient, true)).thenReturn(List.of(appointment));
        when(mapper.toAppointmentResponse(appointment)).thenReturn(appointmentResponse);

        List<AppointmentResponse> result = service.getBookedAppointmentsByPatient(201L);

        assertEquals(1, result.size());
        assertEquals(appointmentResponse, result.get(0));
    }

    @Test
    public void testGetBookedAppointmentsByPatient_notFound() {
        when(patientRepository.findById(201L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () ->
                service.getBookedAppointmentsByPatient(201L));

        assertEquals("Paciente no encontrado", exception.getMessage());
    }

    @Test
    public void testUpdateAppointment() {
        Appointment appointment = new Appointment();
        appointment.setBooked(false);
        AppointmentResponse response = new AppointmentResponse(1, 201L, 101L, LocalDateTime.now(), true, "");
        AppointmentRequest request = new AppointmentRequest(1L, 201L, "");

        Patient patient = new Patient();
        patient.setId(201L);

        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));
        when(patientRepository.findById(201L)).thenReturn(Optional.of(patient));
        when(mapper.toAppointmentResponse(appointment)).thenReturn(response);

        AppointmentResponse result = service.updateAppointment(request);

        assertEquals(response, result);
    }

    @Test
    public void testUpdateAppointment_notFound() {
        AppointmentRequest request = new AppointmentRequest(1L, 201L, "");

        when(appointmentRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () ->
                service.updateAppointment(request));

        assertEquals("Cita no encontrada", exception.getMessage());
    }

    @Test
    public void testUpdateAppointment_alreadyBooked() {
        Appointment appointment = new Appointment();
        appointment.setBooked(true);
        AppointmentRequest request = new AppointmentRequest(1L, 201L, "");

        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));

        Exception exception = assertThrows(AppointmentAlreadyBookedException.class, () ->
                service.updateAppointment(request));

        assertEquals("No se puede reservar cita reservada", exception.getMessage());
    }

    @Test
    public void testGenerateAppointments() {
        OpeningHour openingHour = OpeningHour.builder()
                .medic(new Medic())
                .dayOfWeek(DayOfWeek.MONDAY)
                .startTime(LocalTime.of(9,0))
                .endTime(LocalTime.of(17,0))
                .build();

        when(openingHourRepository.findAll()).thenReturn(List.of(openingHour));

        service.generateAppointments();

        verify(openingHourRepository, times(1)).findAll();
        verify(appointmentRepository, atLeastOnce()).save(any(Appointment.class));
    }

    @Test
    public void testDeleteUnbookedPastAppointments() {
        LocalDateTime now = LocalDateTime.now();

        Appointment appointment = new Appointment();
        appointment.setStartDateTime(now.minusDays(1));
        appointment.setBooked(false);

        when(appointmentRepository.findPastAppointmentsByIsBooked(now, false)).thenReturn(List.of(appointment));

        service.deleteUnbookedPastAppointments();

        verify(appointmentRepository).delete(appointment);
    }
}