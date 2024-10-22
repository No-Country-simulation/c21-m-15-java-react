package com.noCountry.backend.openingHour;

import org.springframework.stereotype.Service;

@Service
public class OpeningHourMapper {

    public OpeningHourResponse toOpeningHourResponse (OpeningHour openingHour) {
        return new OpeningHourResponse(
                openingHour.getDayOfWeek(),
                openingHour.getStartTime(),
                openingHour.getEndTime()
        );
    }
}
