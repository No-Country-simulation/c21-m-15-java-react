package com.noCountry.backend.appointment;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AppointmentResponse (
        long id,
        long patientId,
        long medicId,
        LocalDateTime startDateTime,
        boolean isBooked,
        String notes
) {
}
