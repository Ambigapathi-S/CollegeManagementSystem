package com.example.backend.repository;

import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.entity.BorrowedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Long>  {
    Optional<BorrowedBook> findByBookIdAndMemberId(Long bookId, Long memberId);
}
