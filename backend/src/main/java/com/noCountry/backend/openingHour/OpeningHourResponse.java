package com.noCountry.backend.openingHour;

import java.time.LocalTime;

public record OpeningHourResponse (
        String dayOfWeek,
        LocalTime startTime,
        LocalTime endTime
) {
}
