package com.example.backend.dto;

import com.example.backend.entity.Member;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtMemberResponse {
    private String role;
    private Member member;
}
