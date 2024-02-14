package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    Optional<Genre> findByGenreName(String genreName);

    //FIXME: 테스트 중!
//    @Modifying
//    @Query(value = "insert into Logger (redirect,user_id) VALUES (:insertLink,:id)", nativeQuery = true)
//    @Transactional
//    void logURI(@Param("insertLink") String insertLink, @Param("id") Long id);

    @Modifying
//    @Query(value = "INSERT INTO Genre (genreIdx, genreName) " +
    @Query(value = "INSERT INTO Genre (genre_idx, genre_name) " +
            "VALUES ('1', 'Pop'), ('2', 'Rock'), ('3', 'Hiphop'), ('4', 'Classic'), ('5', 'Jazz'), " +
            "('6', 'R&B'), ('7', 'Disco'), ('8', 'Electrionic'), ('9', 'Balad'), ('10', 'Country'), " +
            "('11', 'Reggae'), ('12', 'Folk'), ('13', 'Etc')", nativeQuery = true)
    @Transactional
    void init();

//    @Modifying
//    @Query(value = "INSERT INTO Genre (genreIdx, genreName) " +
//            "VALUES (1, 'Pop'), (2, 'Rock'), (3, 'Hiphop'), (4, 'Classic'), (5, 'Jazz'), " +
//            "(6, 'R&B'), (7, 'Disco'), (8, 'Electrionic'), (9, 'Balad'), (10, 'Country'), " +
//            "(11, 'Reggae'), (12, 'Folk'), (13, 'Etc')", nativeQuery = true)
//    @Transactional
//    void init();

    //            "(11, 'Reggae'), (12, 'Folk'), (13, 'Etc')")

    /*
    @Query(value = "INSERT INTO Genre (genreIdx, genreName) SELECT 1, 'Pop'; SELECT 2, 'Rock'; SELECT 3, 'Hiphop'", nativeQuery = true)
    void init();
     */

    /*
    @Query("INSERT INTO Genre (genreIdx, genreName) " +
            "VALUES (1, 'Pop'), (2, 'Rock'), (3, 'Hiphop'), (4, 'Classic'), (5, 'Jazz') " +
            "(6, 'R&B'), (7, 'Disco'), (8, 'Electrionic'), (9, 'Balad'), (10, 'Country') " +
//            "(11, 'Reggae'), (12, 'Folk'), (13, 'Etc')")
            "(11, 'Reggae'), (12, 'Folk'), (13, 'Etc'), nativeQuery = true")
    void init();
     */
}
