package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.Book;
import com.example.backend.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/book")
public class BookController {
    private BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> saveBook(@RequestBody BookDto bookDto) {
        BookDto savedBook = bookService.saveBook(bookDto);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> bookDtoList = bookService.getAllBooks();
        return ResponseEntity.ok().body(bookDtoList);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long id, @RequestBody BookDto bookDto) {
        BookDto updateBook = bookService.updateBook(id, bookDto);
        return ResponseEntity.ok(updateBook);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully!");
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") Long id) {
        BookDto bookDto = bookService.getBookById(id);
        return ResponseEntity.ok().body(bookDto);
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<List<Book>>> searchBooks(@RequestParam(required = false) String title, @RequestParam(required = false) String author,
                                                            @RequestParam(required = false) String isbn, @RequestParam(required = false) String genre,
                                                            @RequestParam(required = false) LocalDate publication_date, @RequestParam(required = false) Integer copies_available) {
        Optional<List<Book>> books = bookService.searchBooks(title, author, isbn, genre, publication_date, copies_available);
        return ResponseEntity.ok(books);
    }
}
