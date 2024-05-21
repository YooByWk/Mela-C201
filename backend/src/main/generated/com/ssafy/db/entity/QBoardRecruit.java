package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardRecruit is a Querydsl query type for BoardRecruit
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardRecruit extends EntityPathBase<BoardRecruit> {

    private static final long serialVersionUID = -2023806406L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardRecruit boardRecruit = new QBoardRecruit("boardRecruit");

    public final QBoard boardIdx;

    public final NumberPath<Long> boardRecruitIdx = createNumber("boardRecruitIdx", Long.class);

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final QGenre genreIdx1;

    public final QGenre genreIdx2;

    public final QGenre genreIdx3;

    public QBoardRecruit(String variable) {
        this(BoardRecruit.class, forVariable(variable), INITS);
    }

    public QBoardRecruit(Path<? extends BoardRecruit> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardRecruit(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardRecruit(PathMetadata metadata, PathInits inits) {
        this(BoardRecruit.class, metadata, inits);
    }

    public QBoardRecruit(Class<? extends BoardRecruit> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardIdx = inits.isInitialized("boardIdx") ? new QBoard(forProperty("boardIdx"), inits.get("boardIdx")) : null;
        this.genreIdx1 = inits.isInitialized("genreIdx1") ? new QGenre(forProperty("genreIdx1")) : null;
        this.genreIdx2 = inits.isInitialized("genreIdx2") ? new QGenre(forProperty("genreIdx2")) : null;
        this.genreIdx3 = inits.isInitialized("genreIdx3") ? new QGenre(forProperty("genreIdx3")) : null;
    }

}

