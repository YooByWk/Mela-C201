package com.ssafy.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QJoinChatRoom;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JoinChatRoomRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QJoinChatRoom qJoinChatRoom = QJoinChatRoom.joinChatRoom;

    public String checkIfUserInSameChatRoom(User user1, User user2) {
        Boolean exists = jpaQueryFactory
                .selectOne()
                .from(qJoinChatRoom)
                .where(qJoinChatRoom.chatRoomIdx
                        .in(JPAExpressions
                                .select(qJoinChatRoom.chatRoomIdx)
                                .from(qJoinChatRoom)
                                .where(qJoinChatRoom.userIdx.eq(user2))
                        ).and(qJoinChatRoom.userIdx.eq(user1))
                )
                .fetchFirst() != null;

        String roomIdx = null;
        if (exists) {
            roomIdx = jpaQueryFactory
                    .selectFrom(qJoinChatRoom)
                    .where(qJoinChatRoom.chatRoomIdx
                            .in(JPAExpressions
                                    .select(qJoinChatRoom.chatRoomIdx)
                                    .from(qJoinChatRoom)
                                    .where(qJoinChatRoom.userIdx.eq(user2))
                            ).and(qJoinChatRoom.userIdx.eq(user1))
                    )
                    .fetchFirst()
                    .getChatRoomIdx();
        }

        return roomIdx;
    }


}
