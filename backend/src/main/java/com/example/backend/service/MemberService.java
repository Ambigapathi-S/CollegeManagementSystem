package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.Book;
import com.example.backend.entity.Member;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberService {
    MemberDto saveMember(MemberDto memberDto);
    MemberDto updateMember(Long id, MemberDto memberDto);
    String deleteMember(Long id);
    List<MemberDto> getAllMembers();
    MemberDto getMemberById(Long id);
    Optional<List<Member>> searchMembers(String name, String email, String phoneNumber);
    JwtMemberResponse MemberLogin(MemberLoginDto memberLoginDto);
}
