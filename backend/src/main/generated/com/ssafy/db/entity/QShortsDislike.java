package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShortsDislike is a Querydsl query type for ShortsDislike
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShortsDislike extends EntityPathBase<ShortsDislike> {

    private static final long serialVersionUID = 180811052L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShortsDislike shortsDislike = new QShortsDislike("shortsDislike");

    public final NumberPath<Long> shortsDislikeIdx = createNumber("shortsDislikeIdx", Long.class);

    public final QShorts shortsIdx;

    public final QUser userIdx;

    public QShortsDislike(String variable) {
        this(ShortsDislike.class, forVariable(variable), INITS);
    }

    public QShortsDislike(Path<? extends ShortsDislike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShortsDislike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShortsDislike(PathMetadata metadata, PathInits inits) {
        this(ShortsDislike.class, metadata, inits);
    }

    public QShortsDislike(Class<? extends ShortsDislike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shortsIdx = inits.isInitialized("shortsIdx") ? new QShorts(forProperty("shortsIdx"), inits.get("shortsIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

