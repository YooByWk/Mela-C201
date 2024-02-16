package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QFile is a Querydsl query type for File
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFile extends EntityPathBase<File> {

    private static final long serialVersionUID = 846086206L;

    public static final QFile file = new QFile("file");

    public final StringPath fileDescription = createString("fileDescription");

    public final NumberPath<Long> fileIdx = createNumber("fileIdx", Long.class);

    public final StringPath originalFolder = createString("originalFolder");

    public final StringPath saveFile = createString("saveFile");

    public final StringPath saveFolder = createString("saveFolder");

    public QFile(String variable) {
        super(File.class, forVariable(variable));
    }

    public QFile(Path<? extends File> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFile(PathMetadata metadata) {
        super(File.class, metadata);
    }

}

