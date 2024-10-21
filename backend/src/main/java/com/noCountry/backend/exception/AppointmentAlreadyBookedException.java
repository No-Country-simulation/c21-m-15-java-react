package com.noCountry.backend.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AppointmentAlreadyBookedException extends RuntimeException{
    private final String msg;
}