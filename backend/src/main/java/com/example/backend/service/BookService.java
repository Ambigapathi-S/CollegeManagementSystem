package com.example.backend.service;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.Book;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookService {
    BookDto saveBook(BookDto bookDto);
    BookDto updateBook(Long id, BookDto bookDto);
    String deleteBook(Long id);
    List<BookDto> getAllBooks();
    BookDto getBookById(Long id);
    Optional<List<Book>> searchBooks(String title, String author, String isbn, String genre, LocalDate publication_date, Integer copies_available);


}
