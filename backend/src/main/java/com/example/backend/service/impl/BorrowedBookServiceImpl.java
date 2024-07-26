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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Optional<BorrowedBook> borrowedCount = borrowedBookRepository.findByBookIdAndMemberId(book.getId(), member.getId());
        System.out.println(borrowedCount);
        if(borrowedCount.isEmpty()) {
            BorrowedBook borrowedBook = new BorrowedBook();
            borrowedBook.setId(borrowedBookDto.getId());
            borrowedBook.setIssueDate(borrowedBookDto.getIssueDate());
            borrowedBook.setDueDate(borrowedBookDto.getDueDate());
            borrowedBook.setReturnDate(borrowedBookDto.getReturnDate());
            borrowedBook.setBook(book);
            borrowedBook.setMember(member);
            borrowedBook.setStatus(borrowedBookDto.getStatus());
            return modelMapper.map(borrowedBookRepository.save(borrowedBook), BorrowedBookDto.class);
        } else {
            try {
                throw new Exception("Book Already Borrowed!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public BorrowedBookDto ChangeBorrowedBookStatus(Long id, BorrowedBookDto borrowedBookDto) {
        Book book = bookRepository.findById(borrowedBookDto.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", borrowedBookDto.getBook().getId()));
        Member member = memberRepository.findById(borrowedBookDto.getMember().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", borrowedBookDto.getMember().getId()));
        BorrowedBook borrowedBook = borrowedBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrowed Book", "id", id));
        borrowedBook.setId(id);
        borrowedBook.setIssueDate(borrowedBookDto.getIssueDate());
        borrowedBook.setDueDate(borrowedBookDto.getDueDate());
        borrowedBook.setReturnDate(borrowedBookDto.getReturnDate());
        borrowedBook.setBook(book);
        borrowedBook.setMember(member);
        borrowedBook.setStatus(borrowedBookDto.getStatus());
        return modelMapper.map(borrowedBookRepository.save(borrowedBook), BorrowedBookDto.class);
    }

    @Override
    public List<BorrowedBookDto> getAllBorrowBookList() {
        return borrowedBookRepository.findAll()
                .stream().map(borrow -> modelMapper.map(borrow, BorrowedBookDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BorrowedBookDto getBorrowBookListById(Long id) {
        BorrowedBook borrowedBook = borrowedBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow Book", "id", id));
        return modelMapper.map(borrowedBook, BorrowedBookDto.class);
    }

    @Override
    public Optional<BorrowedBookDto> getBorrowListByBookIDAndMemberID(Long book_id, Long member_id) {
        Optional<BorrowedBook> borrowedBook = borrowedBookRepository.findByBookIdAndMemberId(book_id, member_id);
        System.out.println(borrowedBook);
        return Optional.ofNullable(modelMapper.map(borrowedBook, BorrowedBookDto.class));
    }

    @Override
    public List<BorrowedBookDto> getAllBorrowBookListByStatus(String status) {
        return borrowedBookRepository.findAllByStatus(status)
                .stream().map(borrow -> modelMapper.map(borrow, BorrowedBookDto.class))
                .collect(Collectors.toList());
    }
}
