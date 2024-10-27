package com.noCountry.backend.user;

import lombok.Builder;
import lombok.Data;

public record UserResponse (
        long id,
        String username,
        Role role
) {
}
