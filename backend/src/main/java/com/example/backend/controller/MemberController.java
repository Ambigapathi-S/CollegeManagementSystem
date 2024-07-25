package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.Book;
import com.example.backend.entity.Member;
import com.example.backend.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/member")
public class MemberController {
    private MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberDto> saveMember(@RequestBody MemberDto memberDto) {
        MemberDto savedMember = memberService.saveMember(memberDto);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MemberDto>> getAllMembers() {
        List<MemberDto> memberDtoList = memberService.getAllMembers();
        return ResponseEntity.ok().body(memberDtoList);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<MemberDto> updateMember(@PathVariable("id") Long id, @RequestBody MemberDto memberDto) {
        MemberDto updateMember = memberService.updateMember(id, memberDto);
        return ResponseEntity.ok(updateMember);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok("Member deleted successfully!");
    }

    @GetMapping("{id}")
    public ResponseEntity<MemberDto> getMemberById(@PathVariable("id") Long id) {
        MemberDto memberDto = memberService.getMemberById(id);
        return ResponseEntity.ok().body(memberDto);
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<List<Member>>> searchMembers(@RequestParam(required = false) String name, @RequestParam(required = false) String email,
                                                                @RequestParam(required = false) String phoneNumber) {
        Optional<List<Member>> members = memberService.searchMembers(name, email, phoneNumber);
        return ResponseEntity.ok(members);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtMemberResponse> MemberLogin(@RequestBody MemberLoginDto memberLoginDto) {
        JwtMemberResponse jwtMemberResponse = memberService.MemberLogin(memberLoginDto);
        return ResponseEntity.ok(jwtMemberResponse);
    }
}
