package com.ssafy.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QBoard;
import com.ssafy.db.entity.QBoardRecruit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QBoard qBoard = QBoard.board;
    QBoardRecruit qBoardRecruit = QBoardRecruit.boardRecruit;

    public int countByBoards() {
        int count = (int) jpaQueryFactory
                .selectFrom(qBoard)
                .where(JPAExpressions
                                .selectOne()
                                .from(qBoardRecruit)
                                .where(qBoardRecruit.boardIdx.eq(qBoard))
                                .notExists()
                )
                .fetchCount();

        return count;
    }
}
