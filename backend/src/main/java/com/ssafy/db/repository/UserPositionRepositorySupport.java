package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.QUserPosition;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserPosition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserPositionRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QUserPosition qUserPosition = QUserPosition.userPosition;

    public List<Position> findUserPositionByUser(User user) {
        List<UserPosition> userPositionList = jpaQueryFactory.select(qUserPosition).from(qUserPosition).where(qUserPosition.userIdx.eq(user)).fetch();

        for(UserPosition up : userPositionList) {
            up.get
        }

        return positionList;
    }
}
