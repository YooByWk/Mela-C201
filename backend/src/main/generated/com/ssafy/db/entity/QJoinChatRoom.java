package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJoinChatRoom is a Querydsl query type for JoinChatRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QJoinChatRoom extends EntityPathBase<JoinChatRoom> {

    private static final long serialVersionUID = 938867807L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJoinChatRoom joinChatRoom = new QJoinChatRoom("joinChatRoom");

    public final StringPath chatRoomIdx = createString("chatRoomIdx");

    public final NumberPath<Long> joinChatRoomIdx = createNumber("joinChatRoomIdx", Long.class);

    public final QUser userIdx;

    public QJoinChatRoom(String variable) {
        this(JoinChatRoom.class, forVariable(variable), INITS);
    }

    public QJoinChatRoom(Path<? extends JoinChatRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJoinChatRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJoinChatRoom(PathMetadata metadata, PathInits inits) {
        this(JoinChatRoom.class, metadata, inits);
    }

    public QJoinChatRoom(Class<? extends JoinChatRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

