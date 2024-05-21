package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserPosition is a Querydsl query type for UserPosition
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserPosition extends EntityPathBase<UserPosition> {

    private static final long serialVersionUID = 922572502L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserPosition userPosition = new QUserPosition("userPosition");

    public final QPosition positionIdx;

    public final QUser userIdx;

    public final NumberPath<Long> userPositionIdx = createNumber("userPositionIdx", Long.class);

    public QUserPosition(String variable) {
        this(UserPosition.class, forVariable(variable), INITS);
    }

    public QUserPosition(Path<? extends UserPosition> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserPosition(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserPosition(PathMetadata metadata, PathInits inits) {
        this(UserPosition.class, metadata, inits);
    }

    public QUserPosition(Class<? extends UserPosition> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.positionIdx = inits.isInitialized("positionIdx") ? new QPosition(forProperty("positionIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

