package com.example.backend.service;

import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.entity.BorrowedBook;

public interface BorrowedBookService {
    BorrowedBookDto saveBorrowedBook(BorrowedBookDto borrowedBookDto);
    BorrowedBookDto returnBorrowedBook(Long id, BorrowedBookDto borrowedBookDto);
}
