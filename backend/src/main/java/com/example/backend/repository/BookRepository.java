package com.example.backend.repository;

import com.example.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT b FROM Book b WHERE "
            + "(?1 IS NULL OR b.title LIKE %?1%)"
            + " AND (?2 IS NULL OR b.author LIKE %?2%)"
            + " AND (?3 IS NULL OR b.isbn = ?3)"
            + " AND (?4 IS NULL OR b.genre = ?4)"
            + " AND (?5 IS NULL OR b.publication_date = ?5)"
            + " AND (?6 = -1 OR b.copies_available >= ?6)"
            , nativeQuery = false)
    Optional<List<Book>> findBookByParams(String title, String author, String isbn, String genre, LocalDate publication_date, Integer copies_available);
}
