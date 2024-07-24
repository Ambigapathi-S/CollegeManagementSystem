package com.example.backend.service.impl;

import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.service.BorrowedBookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BorrowedBookServiceImpl implements BorrowedBookService {
    @Override
    public BorrowedBookDto saveBorrowedBook(BorrowedBookDto borrowedBookDto) {
        return null;
    }

    @Override
    public BorrowedBookDto returnBorrowedBook(BorrowedBookDto borrowedBookDto) {
        return null;
    }
}
