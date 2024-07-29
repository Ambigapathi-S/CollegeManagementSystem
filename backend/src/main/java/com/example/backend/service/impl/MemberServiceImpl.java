package com.example.backend.service.impl;

import com.example.backend.dto.*;
import com.example.backend.entity.Book;
import com.example.backend.entity.Member;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.MemberService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements MemberService {
    private MemberRepository memberRepository;
    private RoleRepository roleRepository;
    private ModelMapper modelMapper;
    private UserRepository userRepository;
    @Override
    public MemberDto saveMember(MemberDto memberDto) {
        Member member = modelMapper.map(memberDto, Member.class);
        return modelMapper.map(memberRepository.save(member), MemberDto.class);
    }

    @Override
    public MemberDto updateMember(Long id, MemberDto memberDto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", id));

        member.setId(memberDto.getId());
        member.setName(memberDto.getName());
        member.setEmail(memberDto.getEmail());
        member.setPhoneNumber(memberDto.getPhoneNumber());
        member.setRole(memberDto.getRole());

        return modelMapper.map(memberRepository.save(member), MemberDto.class);
    }

    @Override
    public String deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", id));
        memberRepository.deleteById(id);
        return "Member Removed Successfully!";
    }

    @Override
    public List<MemberDto> getAllMembers() {
        return memberRepository.findAll()
                .stream().map(member -> modelMapper.map(member, MemberDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", id));
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public Optional<List<Member>> searchMembers(String name, String email, String phoneNumber) {
        return memberRepository.findMemberByParams(name, email, phoneNumber);
    }

    @Override
    public JwtMemberResponse MemberLogin(MemberLoginDto memberLoginDto) {

        Optional<Member> userOptional = memberRepository.findByEmail(memberLoginDto.getEmail());

        String role = "ROLE_MEMBER";
        Member member = null;
        Member loggedInUser = userOptional.get();
        if (userOptional.isPresent()) {
            member = userOptional.get();
        }
        if(userOptional.isPresent() && loggedInUser.getPhoneNumber().equals(memberLoginDto.getPhoneNumber())) {
            JwtMemberResponse jwtMemberResponse = new JwtMemberResponse();
            jwtMemberResponse.setRole(role);
            jwtMemberResponse.setMember(member);
            return jwtMemberResponse;
        } else if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User" , "email", memberLoginDto.getEmail());
        } else {
            throw new ResourceNotFoundException("Incorrect Phone Number");
        }
    }
}
