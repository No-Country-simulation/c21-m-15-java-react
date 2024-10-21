package com.noCountry.backend.medic;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicService {
    private final MedicRepository medicRepository;

    // Consultar todos los medicos
    public List<Medic> getAllMedics() {
        return medicRepository.findAll();
    }

    // Consultar medico por ID
    public Medic getMedicById(Long id) {
        return medicRepository.findById(id).orElseThrow(() -> new RuntimeException("Medico no encontrado"));
    }
}
