package com.noCountry.backend.openingHour;

import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.Locale;

@Service
public class OpeningHourMapper {

    public OpeningHourResponse toOpeningHourResponse (OpeningHour openingHour) {
        String dayInSpanish = openingHour.getDayOfWeek().getDisplayName(TextStyle.FULL, new Locale("es", "ES"));
        dayInSpanish = dayInSpanish.substring(0, 1).toUpperCase() + dayInSpanish.substring(1).toLowerCase();

        return new OpeningHourResponse(
                dayInSpanish,
                openingHour.getStartTime(),
                openingHour.getEndTime()
        );
    }
}
