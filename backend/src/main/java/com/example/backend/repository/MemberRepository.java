package com.example.backend.repository;

import com.example.backend.entity.Book;
import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByName(String name);

    @Query(value = "SELECT b FROM Member b WHERE "
            + "(?1 IS NULL OR b.name LIKE %?1%)"
            + " AND (?2 IS NULL OR b.email LIKE %?2%)"
            + " AND (?3 IS NULL OR b.phoneNumber = ?3)"
            , nativeQuery = false)
    Optional<List<Member>> findMemberByParams(String name, String email, String phoneNumber);
}
