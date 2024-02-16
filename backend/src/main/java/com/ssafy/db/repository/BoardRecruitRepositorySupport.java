package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QBoard;
import com.ssafy.db.entity.QBoardRecruit;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRecruitRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;
    QBoardRecruit qBoardRecruit = QBoardRecruit.boardRecruit;

    public int countByMyRecruitBoards(User user) {
        int count = (int) jpaQueryFactory
                .selectOne()
                .from(qBoard)
                .join(qBoardRecruit).on(qBoard.boardIdx.eq(qBoardRecruit.boardIdx.boardIdx))
                .where(qBoard.userIdx.eq(user))
                .fetchCount();
        return count;
    }

}
