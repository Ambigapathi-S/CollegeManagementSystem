package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.service.BookService;
import com.example.backend.service.BorrowedBookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/books")
public class BorrowedBookController {
    private BorrowedBookService borrowedBookService;
    @PostMapping("borrow")
    public ResponseEntity<BorrowedBookDto> saveBorrowedBook(@RequestBody BorrowedBookDto borrowedBookDto) {
        BorrowedBookDto savedBorrowedBook = borrowedBookService.saveBorrowedBook(borrowedBookDto);
        return new ResponseEntity<>(savedBorrowedBook, HttpStatus.CREATED);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<BorrowedBookDto> returnBorrowedBook(@PathVariable("id") Long id, @RequestBody BorrowedBookDto borrowedBookDto) {
        BorrowedBookDto returnedBorrowedBook = borrowedBookService.returnBorrowedBook(id, borrowedBookDto);
        return ResponseEntity.ok(returnedBorrowedBook);
    }

}
