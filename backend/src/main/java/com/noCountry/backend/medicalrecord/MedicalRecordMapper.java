package com.noCountry.backend.medicalrecord;

import org.springframework.stereotype.Service;

@Service
public class MedicalRecordMapper {
    public MedicalRecordResponse toResponse(MedicalRecord medicalRecord){
        return new MedicalRecordResponse(
                medicalRecord.getId(),
                medicalRecord.getPatient().getId(),
                medicalRecord.getConditionName(),
                medicalRecord.getDiagnosisDate(),
                medicalRecord.getTreatment(),
                medicalRecord.getNotes()
        );
    }
}
