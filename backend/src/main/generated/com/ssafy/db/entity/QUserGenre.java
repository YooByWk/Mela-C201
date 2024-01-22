package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserGenre is a Querydsl query type for UserGenre
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserGenre extends EntityPathBase<UserGenre> {

    private static final long serialVersionUID = 688911094L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserGenre userGenre = new QUserGenre("userGenre");

    public final QGenre genreIdx;

    public final NumberPath<Long> userGenreIdx = createNumber("userGenreIdx", Long.class);

    public final QUser userIdx;

    public QUserGenre(String variable) {
        this(UserGenre.class, forVariable(variable), INITS);
    }

    public QUserGenre(Path<? extends UserGenre> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserGenre(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserGenre(PathMetadata metadata, PathInits inits) {
        this(UserGenre.class, metadata, inits);
    }

    public QUserGenre(Class<? extends UserGenre> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.genreIdx = inits.isInitialized("genreIdx") ? new QGenre(forProperty("genreIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

