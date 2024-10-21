package com.noCountry.backend.medicalrecord;


import java.time.LocalDate;

public record MedicalRecordResponse (
        long id,
        long patientId,
        String conditionName,
        LocalDate diagnosisDate,
        String treatment,
        String notes
) {
}
