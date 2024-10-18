package com.noCountry.backend.appointment;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record AppointmentResponse (
        long id,
        long patientId,
        long medicId,
        LocalTime startTime,
        DayOfWeek dayOfWeek,
        boolean isBooked,
        String notes
) {
}
