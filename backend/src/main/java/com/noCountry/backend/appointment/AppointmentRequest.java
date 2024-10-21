package com.noCountry.backend.appointment;

public record AppointmentRequest(
        long id,
        long patientId,
        String notes
) {
}
