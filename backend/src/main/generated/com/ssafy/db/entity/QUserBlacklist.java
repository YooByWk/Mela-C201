package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserBlacklist is a Querydsl query type for UserBlacklist
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserBlacklist extends EntityPathBase<UserBlacklist> {

    private static final long serialVersionUID = -1839128304L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserBlacklist userBlacklist = new QUserBlacklist("userBlacklist");

    public final QUser blockedUserIdx;

    public final NumberPath<Long> userBlacklistIdx = createNumber("userBlacklistIdx", Long.class);

    public final QUser userIdx;

    public QUserBlacklist(String variable) {
        this(UserBlacklist.class, forVariable(variable), INITS);
    }

    public QUserBlacklist(Path<? extends UserBlacklist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserBlacklist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserBlacklist(PathMetadata metadata, PathInits inits) {
        this(UserBlacklist.class, metadata, inits);
    }

    public QUserBlacklist(Class<? extends UserBlacklist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.blockedUserIdx = inits.isInitialized("blockedUserIdx") ? new QUser(forProperty("blockedUserIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

