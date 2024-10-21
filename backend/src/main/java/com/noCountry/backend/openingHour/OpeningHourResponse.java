package com.noCountry.backend.openingHour;

import java.time.DayOfWeek;
import java.time.LocalDate;

public record OpeningHourResponse (
        long medicId,
        DayOfWeek dayOfWeek,
        LocalDate startTime,
        LocalDate endTime
) {
}
