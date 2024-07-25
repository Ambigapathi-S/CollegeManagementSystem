package com.example.backend.service;

import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.entity.BorrowedBook;

import java.util.List;

public interface BorrowedBookService {
    BorrowedBookDto saveBorrowedBook(BorrowedBookDto borrowedBookDto);
    BorrowedBookDto ChangeBorrowedBookStatus(Long id, BorrowedBookDto borrowedBookDto);

    List<BorrowedBookDto> getAllBorrowBookList();
    BorrowedBookDto getBorrowBookListById(Long id);
    BorrowedBookDto getBorrowListByBookIDAndMemberID(Long book_id, Long member_id);
}
