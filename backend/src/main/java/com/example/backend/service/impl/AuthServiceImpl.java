package com.example.backend.service.impl;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginDto;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

        String role = "";
        User loggedInUser = null;
        if (userOptional.isPresent()) {
            loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            Role userRole = optionalRole.get();
            role = userRole.getName();
        }
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setUser(loggedInUser);
        return jwtAuthResponse;
    }
}
