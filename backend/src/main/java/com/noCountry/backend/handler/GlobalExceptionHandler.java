package com.noCountry.backend.handler;

import com.noCountry.backend.exception.AppointmentAlreadyBookedException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handle(EntityNotFoundException exp) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exp.getMessage());
    }

    @ExceptionHandler(AppointmentAlreadyBookedException.class)
    public ResponseEntity<?> handleAppointmentAlreadyBookedException(AppointmentAlreadyBookedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMsg());
    }
}
