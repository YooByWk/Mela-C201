package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShorts is a Querydsl query type for Shorts
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShorts extends EntityPathBase<Shorts> {

    private static final long serialVersionUID = 1711386041L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShorts shorts = new QShorts("shorts");

    public final StringPath comment = createString("comment");

    public final NumberPath<Long> shortsIdx = createNumber("shortsIdx", Long.class);

    public final QFile shortsPathFileIdx;

    public final QUser userIdx;

    public QShorts(String variable) {
        this(Shorts.class, forVariable(variable), INITS);
    }

    public QShorts(Path<? extends Shorts> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShorts(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShorts(PathMetadata metadata, PathInits inits) {
        this(Shorts.class, metadata, inits);
    }

    public QShorts(Class<? extends Shorts> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shortsPathFileIdx = inits.isInitialized("shortsPathFileIdx") ? new QFile(forProperty("shortsPathFileIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

