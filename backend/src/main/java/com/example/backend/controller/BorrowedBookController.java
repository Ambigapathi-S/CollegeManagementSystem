package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.service.BookService;
import com.example.backend.service.BorrowedBookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("borrow/{id}")
    public ResponseEntity<BorrowedBookDto> ChangeBorrowedBookStatus(@PathVariable("id") Long id, @RequestBody BorrowedBookDto borrowedBookDto) {
        BorrowedBookDto returnedBorrowedBook = borrowedBookService.ChangeBorrowedBookStatus(id, borrowedBookDto);
        return ResponseEntity.ok(returnedBorrowedBook);
    }

    @GetMapping
    public ResponseEntity<List<BorrowedBookDto>> getAllBorrowBookList() {
        List<BorrowedBookDto> borrowedBookDtos = borrowedBookService.getAllBorrowBookList();
        return ResponseEntity.ok().body(borrowedBookDtos);
    }

    @GetMapping("{id}")
    public ResponseEntity<BorrowedBookDto> getBorrowBookListById(@PathVariable("id") Long id) {
        BorrowedBookDto borrowedBookDto = borrowedBookService.getBorrowBookListById(id);
        return ResponseEntity.ok().body(borrowedBookDto);
    }

    @GetMapping("filter")
    public ResponseEntity<Optional<BorrowedBookDto>> getBorrowListByBookIDAndMemberID(@RequestParam("book_id") Long book_id, @RequestParam("member_id") Long member_id) {
        Optional<BorrowedBookDto> borrowedBookDto = borrowedBookService.getBorrowListByBookIDAndMemberID(book_id,member_id);
        return ResponseEntity.ok().body(borrowedBookDto);
    }

    @GetMapping("find")
    public ResponseEntity<List<BorrowedBookDto>> getAllBorrowBookListByStatus(@RequestParam("status") String status) {
        List<BorrowedBookDto> borrowedBookDto = borrowedBookService.getAllBorrowBookListByStatus(status);
        return ResponseEntity.ok().body(borrowedBookDto);
    }
}
