package com.noCountry.backend.medic;

import com.noCountry.backend.openingHour.OpeningHour;
import com.noCountry.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Medic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String firstName;
    private String lastName;
    private String specialty;
    private String email;
    private String telephone;
    @OneToMany(mappedBy = "medic")
    private List<OpeningHour> openingHours;
}
