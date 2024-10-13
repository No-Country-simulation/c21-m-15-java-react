package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByMedic(Medic medicById);

    List<Appointment> findByPatient(Patient patientById);
}
