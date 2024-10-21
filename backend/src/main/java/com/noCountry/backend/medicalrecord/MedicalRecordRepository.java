package com.noCountry.backend.medicalrecord;

import com.noCountry.backend.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord,Long> {
    // Consultar registros medicos de un paciente a partir de su ID
    List<MedicalRecord> findByPatient(Patient patientById);
}
