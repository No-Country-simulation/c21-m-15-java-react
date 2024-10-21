package com.noCountry.backend.medic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicRepository extends JpaRepository<Medic,Long> {

    public List<Medic> findAllBySpeciality (String speciality);
}
