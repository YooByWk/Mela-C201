package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFile is a Querydsl query type for File
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFile extends EntityPathBase<File> {

    private static final long serialVersionUID = 846086206L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFile file = new QFile("file");

    public final StringPath fileDescription = createString("fileDescription");

    public final NumberPath<Long> fileIdx = createNumber("fileIdx", Long.class);

    public final NumberPath<Long> fileSize = createNumber("fileSize", Long.class);

    public final StringPath originalFilename = createString("originalFilename");

    public final StringPath saveFilename = createString("saveFilename");

    public final StringPath savePath = createString("savePath");

    public final QUser userIdx;

    public QFile(String variable) {
        this(File.class, forVariable(variable), INITS);
    }

    public QFile(Path<? extends File> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFile(PathMetadata metadata, PathInits inits) {
        this(File.class, metadata, inits);
    }

    public QFile(Class<? extends File> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

