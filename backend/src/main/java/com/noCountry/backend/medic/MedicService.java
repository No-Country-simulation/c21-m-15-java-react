package com.noCountry.backend.medic;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicService {
    private final MedicRepository medicRepository;
    private final MedicMapper mapper;

    // Consultar todos los medicos
    public List<MedicResponse> getAllMedics() {
        return medicRepository.findAll()
                .stream()
                .map(mapper::toMedicResponse)
                .toList();
    }

    // Consultar medico por ID
    public Medic getMedicById(Long id) {
        return medicRepository.findById(id).orElseThrow(() -> new RuntimeException("Medico no encontrado"));
    }
}
