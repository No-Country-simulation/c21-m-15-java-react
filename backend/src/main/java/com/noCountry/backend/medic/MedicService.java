package com.noCountry.backend.medic;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicService {
    private final MedicRepository medicRepository;
    private final MedicMapper mapper;

    // Consultar todos los medicos por especialidad o no
    public List<MedicResponse> getMedics(String speciality) {
        List<Medic> medics;

        if (speciality == null)
            medics = medicRepository.findAll();
        else
            medics = medicRepository.findAllBySpeciality(speciality);

        return medics
                .stream()
                .map(mapper::toMedicResponse)
                .toList();
    }

    // Consultar medico por ID
    public Medic getMedicById(Long id) {
        return medicRepository.findById(id).orElseThrow(() -> new RuntimeException("Medico no encontrado"));
    }
}
