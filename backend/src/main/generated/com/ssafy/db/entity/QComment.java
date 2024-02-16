package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = 396596317L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QComment comment = new QComment("comment");

    public final QBoard boardIdx;

    public final NumberPath<Long> commentIdx = createNumber("commentIdx", Long.class);

    public final StringPath content = createString("content");

    public final StringPath nickname = createString("nickname");

    public final DateTimePath<java.time.LocalDateTime> registDate = createDateTime("registDate", java.time.LocalDateTime.class);

    public final QUser userIdx;

    public QComment(String variable) {
        this(Comment.class, forVariable(variable), INITS);
    }

    public QComment(Path<? extends Comment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QComment(PathMetadata metadata, PathInits inits) {
        this(Comment.class, metadata, inits);
    }

    public QComment(Class<? extends Comment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardIdx = inits.isInitialized("boardIdx") ? new QBoard(forProperty("boardIdx"), inits.get("boardIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

