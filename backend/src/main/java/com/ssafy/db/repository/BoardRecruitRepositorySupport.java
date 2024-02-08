package com.ssafy.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.board.response.BoardRecruitRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.db.entity.QTeamspace.teamspace;
import static com.ssafy.db.entity.QTeamspaceMember.teamspaceMember;
import static com.ssafy.db.entity.QUser.user;

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

    public List<BoardRecruit> getRecommendedBoardList(List<BoardRecruit> recruits) {
        List<BoardRecruit> jpaQ;
    }

}
