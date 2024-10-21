package com.noCountry.backend.medic;

import com.noCountry.backend.openingHour.OpeningHourMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicMapper {

    private final OpeningHourMapper openingHourMapper;

    public MedicResponse toMedicResponse (Medic medic) {
        return new MedicResponse(
                medic.getId(),
                medic.getName(),
                medic.getPicture(),
                medic.getSpeciality(),
                medic.getDescription(),
                medic.getOpeningHours()
                        .stream()
                        .map(openingHourMapper::toOpeningHourResponse)
                        .toList()
        );
    }
}
