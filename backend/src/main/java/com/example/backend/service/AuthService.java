package com.example.backend.service;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginDto;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
}
