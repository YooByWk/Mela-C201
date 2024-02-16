package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShortsLike is a Querydsl query type for ShortsLike
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShortsLike extends EntityPathBase<ShortsLike> {

    private static final long serialVersionUID = 230051056L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShortsLike shortsLike = new QShortsLike("shortsLike");

    public final QShorts shortsIdx;

    public final NumberPath<Long> shortsLikeIdx = createNumber("shortsLikeIdx", Long.class);

    public final QUser userIdx;

    public QShortsLike(String variable) {
        this(ShortsLike.class, forVariable(variable), INITS);
    }

    public QShortsLike(Path<? extends ShortsLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShortsLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShortsLike(PathMetadata metadata, PathInits inits) {
        this(ShortsLike.class, metadata, inits);
    }

    public QShortsLike(Class<? extends ShortsLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shortsIdx = inits.isInitialized("shortsIdx") ? new QShorts(forProperty("shortsIdx"), inits.get("shortsIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

