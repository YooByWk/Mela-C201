package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    public static final QUser user = new QUser("user");

    public final DateTimePath<java.time.LocalDateTime> birth = createDateTime("birth", java.time.LocalDateTime.class);

    public final StringPath emailDomain = createString("emailDomain");

    public final StringPath emailId = createString("emailId");

    public final StringPath gender = createString("gender");

    public final StringPath jwtToken = createString("jwtToken");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final BooleanPath searchAllow = createBoolean("searchAllow");

    public final NumberPath<Long> userIdx = createNumber("userIdx", Long.class);

    public final StringPath userType = createString("userType");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

