package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeamspace is a Querydsl query type for Teamspace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamspace extends EntityPathBase<Teamspace> {

    private static final long serialVersionUID = 214613831L;

    public static final QTeamspace teamspace = new QTeamspace("teamspace");

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    public final StringPath host = createString("host");

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final StringPath teamName = createString("teamName");

    public final NumberPath<Long> teamspaceIdx = createNumber("teamspaceIdx", Long.class);

    public QTeamspace(String variable) {
        super(Teamspace.class, forVariable(variable));
    }

    public QTeamspace(Path<? extends Teamspace> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamspace(PathMetadata metadata) {
        super(Teamspace.class, metadata);
    }

}

