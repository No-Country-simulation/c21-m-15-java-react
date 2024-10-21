package com.noCountry.backend.openingHour;

import com.noCountry.backend.medic.Medic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class OpeningHour {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "medic_id", referencedColumnName = "id")
    private Medic medic;
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}
