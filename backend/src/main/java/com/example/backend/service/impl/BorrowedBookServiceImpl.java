package com.example.backend.service.impl;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BorrowedBookDto;
import com.example.backend.entity.Book;
import com.example.backend.entity.BorrowedBook;
import com.example.backend.entity.Member;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.BorrowedBookRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.BorrowedBookService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BorrowedBookServiceImpl implements BorrowedBookService {
    private BorrowedBookRepository borrowedBookRepository;
    private ModelMapper modelMapper;
    private BookRepository bookRepository;
    private MemberRepository memberRepository;
    @Override
    public BorrowedBookDto saveBorrowedBook(BorrowedBookDto borrowedBookDto) {
        Book book = bookRepository.findById(borrowedBookDto.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", borrowedBookDto.getBook().getId()));
        Member member = memberRepository.findById(borrowedBookDto.getMember().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", borrowedBookDto.getMember().getId()));
        BorrowedBook borrowedBook = new BorrowedBook();
        borrowedBook.setId(borrowedBookDto.getId());
        borrowedBook.setIssueDate(borrowedBookDto.getIssueDate());
        borrowedBook.setDueDate(borrowedBookDto.getDueDate());
        borrowedBook.setReturnDate(borrowedBookDto.getReturnDate());
        borrowedBook.setBook(book);
        borrowedBook.setMember(member);
        return modelMapper.map(borrowedBookRepository.save(borrowedBook), BorrowedBookDto.class);
    }

    @Override
    public BorrowedBookDto returnBorrowedBook(Long id, BorrowedBookDto borrowedBookDto) {
        BorrowedBook borrowedBook = borrowedBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrowed Book", "id", id));
        Book book = bookRepository.findById(borrowedBookDto.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", borrowedBookDto.getBook().getId()));
        Member member = memberRepository.findById(borrowedBookDto.getMember().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", borrowedBookDto.getMember().getId()));
        borrowedBook.setId(id);
        borrowedBook.setIssueDate(borrowedBookDto.getIssueDate());
        borrowedBook.setDueDate(borrowedBookDto.getDueDate());
        borrowedBook.setReturnDate(borrowedBookDto.getReturnDate());
        borrowedBook.setBook(book);
        borrowedBook.setMember(member);
        return modelMapper.map(borrowedBookRepository.save(borrowedBook), BorrowedBookDto.class);
    }
}
