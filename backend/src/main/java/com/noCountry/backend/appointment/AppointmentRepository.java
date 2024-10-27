package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByMedic(Medic medicById);

    List<Appointment> findByPatient(Patient patientById);

    List<Appointment> findByMedicAndIsBooked(Medic medic, boolean isBooked);

    List<Appointment> findByPatientAndIsBooked(Patient patient, boolean isBooked);

    @Query("SELECT a FROM Appointment a WHERE a.startDateTime < :now AND a.isBooked = :isBooked")
    List<Appointment> findPastAppointmentsByIsBooked(@Param("now")LocalDateTime now, @Param("isBooked") boolean isBooked);
}
