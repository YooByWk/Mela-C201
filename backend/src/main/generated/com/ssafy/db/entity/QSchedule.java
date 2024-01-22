package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSchedule is a Querydsl query type for Schedule
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSchedule extends EntityPathBase<Schedule> {

    private static final long serialVersionUID = -685921191L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSchedule schedule = new QSchedule("schedule");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    public final StringPath place = createString("place");

    public final NumberPath<Long> scheduleIdx = createNumber("scheduleIdx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final QTeamspace teamspaceIdx;

    public QSchedule(String variable) {
        this(Schedule.class, forVariable(variable), INITS);
    }

    public QSchedule(Path<? extends Schedule> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSchedule(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSchedule(PathMetadata metadata, PathInits inits) {
        this(Schedule.class, metadata, inits);
    }

    public QSchedule(Class<? extends Schedule> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamspaceIdx = inits.isInitialized("teamspaceIdx") ? new QTeamspace(forProperty("teamspaceIdx")) : null;
    }

}

