package com.ssafy.db.repository;

import com.ssafy.db.entity.BoardRecruit;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRecruitRepository extends JpaRepository<BoardRecruit, Long> {

    Optional<BoardRecruit> findByBoardIdx(Long boardIdx);

    @Query("SELECT br FROM Board b " +
            "JOIN BoardRecruit br " +
            "ON b.boardIdx = br.boardIdx " +
            "WHERE (:keyword IS NULL OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%)")
    Page<BoardRecruit> findByTitleContainingOrContentContaining(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT br FROM Board b " +
            "JOIN BoardRecruit br " +
            "ON b.boardIdx = br.boardIdx " +
            "WHERE b.userIdx = :userIdx")
    Page<BoardRecruit> findByUserIdx(@Param("userIdx") User userIdx, Pageable pageable);

    //TODO: 테스트 필요

//    @Query("SELECT * " +
    @Query("SELECT br " +
//            "FROM BoardRecruit br " +
            "FROM Board b " +
//            "RIGHT JOIN Board b ON br.boardIdx = b.boardIdx " +
            "RIGHT JOIN BoardRecruit br ON br.boardIdx = b.boardIdx " +
            "WHERE br.boardIdx IN ( " +
            "    SELECT br.boardIdx " +
            "    FROM BoardRecruit br " +
            "    JOIN UserGenre ug ON br.genreIdx1 = ug.genreIdx OR br.genreIdx2 = ug.genreIdx OR br.genreIdx3 = ug.genreIdx " +
            "    WHERE ug.userIdx = :userIdx " +
            "    AND br.boardRecruitIdx IN ( " +
            "        SELECT boardRecruitIdx " +
            "        FROM BoardRecruitPosition " +
            "        WHERE positionIdx IN (" +
            "            SELECT positionIdx " +
            "            FROM UserPosition " +
            "            WHERE userIdx = :userIdx " +
            "        )" +
            "    AND br.boardRecruitIdx IN " +
            "        (SELECT boardIdx FROM Board WHERE :keyword IS NULL OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%)" +
            "    )" +
            ")")
    Page<BoardRecruit> findRecommendedBoardListByGenreIdx(@Param("keyword") String keyword, @Param("userIdx") User userIdx, Pageable pageable);

    //아니 왜 이 쿼리 안되는지 (마지막 줄 :keyword를 Board 테이블이 아니라 BoardRecruit에 대입함) #검색 조건(예: 조회수 - viewNum) 없이 호출하면 괜찮음
    /*
    @Query("SELECT br " +
            "FROM BoardRecruit br " +
            "JOIN UserGenre ug ON br.genreIdx1 = ug.genreIdx OR br.genreIdx2 = ug.genreIdx OR br.genreIdx3 = ug.genreIdx " +
            "WHERE ug.userIdx = :userIdx AND br.boardRecruitIdx IN (SELECT boardRecruitIdx FROM BoardRecruitPosition WHERE positionIdx IN (SELECT positionIdx FROM UserPosition WHERE userIdx = :userIdx))" +
            "AND br.boardRecruitIdx IN (SELECT b.boardIdx FROM Board b WHERE (:keyword IS NULL OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%))")
    Page<BoardRecruit> findRecommendedBoardListByGenreIdx(@Param("keyword") String keyword, @Param("userIdx") User userIdx, Pageable pageable);
     */

    /*
    @Query("SELECT br " +
            "FROM BoardRecruit br " +
            "JOIN UserGenre ug ON br.genreIdx1 = ug.genreIdx OR br.genreIdx2 = ug.genreIdx OR br.genreIdx3 = ug.genreIdx " +
            "WHERE ug.userIdx = :userIdx AND br.boardRecruitIdx IN (SELECT boardRecruitIdx FROM BoardRecruitPosition WHERE positionIdx IN (SELECT positionIdx FROM UserPosition WHERE userIdx = :userIdx)) AND (:keyword IS NULL OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%)")
    Page<BoardRecruit> findRecommendedBoardListByGenreIdx(@Param("keyword") String keyword, @Param("userIdx") User userIdx, Pageable pageable);
     */

    /*
    @Query("SELECT br.*\n" +
            "FROM board_recruit br\n" +
            "JOIN user_genre ug ON br.genre_idx1 = ug.genre_idx OR br.genre_idx2 = ug.genre_idx OR br.genre_idx3 = ug.genre_idx\n" +
            "WHERE ug.user_idx = :userIdx AND br.board_recruit_idx IN (SELECT board_recruit_idx FROM board_recruit_position WHERE position_idx IN (SELECT position_idx FROM user_position WHERE user_idx = :userIdx));")
    Page<BoardRecruit> findRecommendedBoardListByGenreIdx(@Param("keyword") String keyword, @Param("userIdx") User userIdx, Pageable pageable);
     */
}
