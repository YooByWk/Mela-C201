package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardRecruitPosition is a Querydsl query type for BoardRecruitPosition
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardRecruitPosition extends EntityPathBase<BoardRecruitPosition> {

    private static final long serialVersionUID = -1165800061L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardRecruitPosition boardRecruitPosition = new QBoardRecruitPosition("boardRecruitPosition");

    public final QBoardRecruit boardRecruitIdx;

    public final NumberPath<Long> boardRecruitPositionIdx = createNumber("boardRecruitPositionIdx", Long.class);

    public final QPosition positionIdx;

    public QBoardRecruitPosition(String variable) {
        this(BoardRecruitPosition.class, forVariable(variable), INITS);
    }

    public QBoardRecruitPosition(Path<? extends BoardRecruitPosition> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardRecruitPosition(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardRecruitPosition(PathMetadata metadata, PathInits inits) {
        this(BoardRecruitPosition.class, metadata, inits);
    }

    public QBoardRecruitPosition(Class<? extends BoardRecruitPosition> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardRecruitIdx = inits.isInitialized("boardRecruitIdx") ? new QBoardRecruit(forProperty("boardRecruitIdx"), inits.get("boardRecruitIdx")) : null;
        this.positionIdx = inits.isInitialized("positionIdx") ? new QPosition(forProperty("positionIdx")) : null;
    }

}

