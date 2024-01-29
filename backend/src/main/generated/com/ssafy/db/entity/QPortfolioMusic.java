package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPortfolioMusic is a Querydsl query type for PortfolioMusic
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPortfolioMusic extends EntityPathBase<PortfolioMusic> {

    private static final long serialVersionUID = -192395777L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPortfolioMusic portfolioMusic = new QPortfolioMusic("portfolioMusic");

    public final QFile albumArtFileIdx;

    public final QFile lyricFileIdx;

    public final QFile musicFileIdx;

    public final BooleanPath pinFixed = createBoolean("pinFixed");

    public final NumberPath<Long> portfolioMusicIdx = createNumber("portfolioMusicIdx", Long.class);

    public final StringPath title = createString("title");

    public final QUser userIdx;

    public QPortfolioMusic(String variable) {
        this(PortfolioMusic.class, forVariable(variable), INITS);
    }

    public QPortfolioMusic(Path<? extends PortfolioMusic> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPortfolioMusic(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPortfolioMusic(PathMetadata metadata, PathInits inits) {
        this(PortfolioMusic.class, metadata, inits);
    }

    public QPortfolioMusic(Class<? extends PortfolioMusic> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.albumArtFileIdx = inits.isInitialized("albumArtFileIdx") ? new QFile(forProperty("albumArtFileIdx")) : null;
        this.lyricFileIdx = inits.isInitialized("lyricFileIdx") ? new QFile(forProperty("lyricFileIdx")) : null;
        this.musicFileIdx = inits.isInitialized("musicFileIdx") ? new QFile(forProperty("musicFileIdx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

