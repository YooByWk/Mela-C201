package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamspace is a Querydsl query type for Teamspace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamspace extends EntityPathBase<Teamspace> {

    private static final long serialVersionUID = 214613831L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamspace teamspace = new QTeamspace("teamspace");

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final QUser host;

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final StringPath teamDescription = createString("teamDescription");

    public final StringPath teamName = createString("teamName");

    public final QFile teamspace_background_picture_file_idx;

    public final QFile teamspace_picture_file_idx;

    public final NumberPath<Long> teamspaceIdx = createNumber("teamspaceIdx", Long.class);

    public QTeamspace(String variable) {
        this(Teamspace.class, forVariable(variable), INITS);
    }

    public QTeamspace(Path<? extends Teamspace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamspace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamspace(PathMetadata metadata, PathInits inits) {
        this(Teamspace.class, metadata, inits);
    }

    public QTeamspace(Class<? extends Teamspace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.host = inits.isInitialized("host") ? new QUser(forProperty("host")) : null;
        this.teamspace_background_picture_file_idx = inits.isInitialized("teamspace_background_picture_file_idx") ? new QFile(forProperty("teamspace_background_picture_file_idx")) : null;
        this.teamspace_picture_file_idx = inits.isInitialized("teamspace_picture_file_idx") ? new QFile(forProperty("teamspace_picture_file_idx")) : null;
    }

}

