package com.noCountry.backend.user;

import lombok.Builder;
import lombok.Data;

public record UserResponse (
        int id,
        String username,
        Role role
) {
}
