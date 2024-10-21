package com.noCountry.backend.appointment;

import com.noCountry.backend.medic.Medic;
import com.noCountry.backend.patient.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"medic_id", "startDateTime"}))
public class Appointment {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "medic_id", referencedColumnName = "id")
    private Medic medic;

    private LocalDateTime startDateTime;
    private boolean isBooked = false;
    private String notes;
}
