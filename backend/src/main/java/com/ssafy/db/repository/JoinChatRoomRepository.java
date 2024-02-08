package com.ssafy.db.repository;

import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JoinChatRoomRepository extends JpaRepository<JoinChatRoom, Long> {
    Optional<JoinChatRoom> findByChatRoomIdxAndUserIdx(String chatRoomIdx, User userIdx);

    List<JoinChatRoom> findByUserIdx(User userIdx);

    Optional<JoinChatRoom> findByChatRoomIdxAndUserIdxNot(String chatRoomIdx, User userIdx);
}
