package com.example.backend.service.impl;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginDto;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
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
        if(userOptional.isPresent() && loggedInUser.getPassword().equals(loginDto.getPassword())) {
            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setRole(role);
            jwtAuthResponse.setUser(loggedInUser);
            return jwtAuthResponse;
        } else if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User" , "email", loginDto.getEmail());
        } else {
            throw new ResourceNotFoundException("Incorrect Password");
        }
    }
}
