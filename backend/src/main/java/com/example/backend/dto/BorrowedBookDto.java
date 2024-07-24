package com.example.backend.dto;

import com.example.backend.entity.Book;
import com.example.backend.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowedBookDto {
    private Long id;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private String genre;

    private Book book;

    private Member member;
}
