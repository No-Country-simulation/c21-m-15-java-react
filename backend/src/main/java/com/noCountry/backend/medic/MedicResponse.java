package com.noCountry.backend.medic;

import com.noCountry.backend.openingHour.OpeningHourResponse;
import jakarta.persistence.Lob;

import java.util.List;

public record MedicResponse(
        long id,
        String name,
        String picture,
        String speciality,
        String description,
        List<OpeningHourResponse> openingHours
) {
}
