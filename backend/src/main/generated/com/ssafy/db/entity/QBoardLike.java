package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardLike is a Querydsl query type for BoardLike
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardLike extends EntityPathBase<BoardLike> {

    private static final long serialVersionUID = -1234481637L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardLike boardLike = new QBoardLike("boardLike");

    public final QBoard boardIdx;

    public final NumberPath<Long> boardLikeIdx = createNumber("boardLikeIdx", Long.class);

    public final QUser userIdx;

    public QBoardLike(String variable) {
        this(BoardLike.class, forVariable(variable), INITS);
    }

    public QBoardLike(Path<? extends BoardLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardLike(PathMetadata metadata, PathInits inits) {
        this(BoardLike.class, metadata, inits);
    }

    public QBoardLike(Class<? extends BoardLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardIdx = inits.isInitialized("boardIdx") ? new QBoard(forProperty("boardIdx"), inits.get("boardIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

