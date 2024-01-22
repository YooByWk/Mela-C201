package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamspaceMember is a Querydsl query type for TeamspaceMember
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamspaceMember extends EntityPathBase<TeamspaceMember> {

    private static final long serialVersionUID = -931044159L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamspaceMember teamspaceMember = new QTeamspaceMember("teamspaceMember");

    public final QTeamspace teamspaceIdx;

    public final NumberPath<Long> teamspaceMemberIdx = createNumber("teamspaceMemberIdx", Long.class);

    public final QUser userIdx;

    public QTeamspaceMember(String variable) {
        this(TeamspaceMember.class, forVariable(variable), INITS);
    }

    public QTeamspaceMember(Path<? extends TeamspaceMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamspaceMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamspaceMember(PathMetadata metadata, PathInits inits) {
        this(TeamspaceMember.class, metadata, inits);
    }

    public QTeamspaceMember(Class<? extends TeamspaceMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamspaceIdx = inits.isInitialized("teamspaceIdx") ? new QTeamspace(forProperty("teamspaceIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

