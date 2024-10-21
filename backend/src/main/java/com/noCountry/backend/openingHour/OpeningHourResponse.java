package com.noCountry.backend.openingHour;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record OpeningHourResponse (
        DayOfWeek dayOfWeek,
        LocalTime startTime,
        LocalTime endTime
) {
}
