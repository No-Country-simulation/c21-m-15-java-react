package com.noCountry.backend.patient;

import org.springframework.stereotype.Service;

@Service
public class PatientMapper {

    public PatientResponse toPatientResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getEmail(),
                patient.getTelephone()
        );
    }
}
