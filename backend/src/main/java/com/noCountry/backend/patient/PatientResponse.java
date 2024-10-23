package com.noCountry.backend.patient;

public record PatientResponse(
        long id,
        String firstname,
        String lastname,
        String email,
        String telephone
) {
}
