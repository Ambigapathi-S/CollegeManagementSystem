package com.example.backend.service.impl;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.Book;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BookRepository;
import com.example.backend.service.BookService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;
    private ModelMapper modelMapper;
    @Override
    public BookDto saveBook(BookDto bookDto) {
        Book book = modelMapper.map(bookDto, Book.class);
        return modelMapper.map(bookRepository.save(book), BookDto.class);
    }

    @Override
    public BookDto updateBook(Long id, BookDto bookDto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        book.setId(bookDto.getId());
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setIsbn(bookDto.getIsbn());
        book.setGenre(bookDto.getGenre());
        book.setPublication_date(bookDto.getPublication_date());
        book.setCopies_available(bookDto.getCopies_available());
        return modelMapper.map(bookRepository.save(book), BookDto.class);
    }

    @Override
    public String deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        bookRepository.deleteById(id);
        return "Book Deleted Successfully!";
    }

    @Override
    public List<BookDto> getAllBooks() {
        return bookRepository.findAll()
                .stream().map(book -> modelMapper.map(book, BookDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BookDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public Optional<List<Book>> searchBooks(String title, String author, String isbn, String genre, LocalDate publication_date, Integer copies_available) {
        if(copies_available == null) {
            copies_available = 0;
        }
        return bookRepository.findBookByParams(title, author, isbn, genre, publication_date, copies_available);
    }

}
