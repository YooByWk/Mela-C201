package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPortfolioAbstract is a Querydsl query type for PortfolioAbstract
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPortfolioAbstract extends EntityPathBase<PortfolioAbstract> {

    private static final long serialVersionUID = -1287106040L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPortfolioAbstract portfolioAbstract = new QPortfolioAbstract("portfolioAbstract");

    public final StringPath instagram = createString("instagram");

    public final QFile portfolio_picture_file_idx;

    public final NumberPath<Long> portfolioAbstractIdx = createNumber("portfolioAbstractIdx", Long.class);

    public final StringPath selfIntro = createString("selfIntro");

    public final QUser userIdx;

    public final StringPath youtube = createString("youtube");

    public QPortfolioAbstract(String variable) {
        this(PortfolioAbstract.class, forVariable(variable), INITS);
    }

    public QPortfolioAbstract(Path<? extends PortfolioAbstract> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPortfolioAbstract(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPortfolioAbstract(PathMetadata metadata, PathInits inits) {
        this(PortfolioAbstract.class, metadata, inits);
    }

    public QPortfolioAbstract(Class<? extends PortfolioAbstract> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.portfolio_picture_file_idx = inits.isInitialized("portfolio_picture_file_idx") ? new QFile(forProperty("portfolio_picture_file_idx"), inits.get("portfolio_picture_file_idx")) : null;
        this.userIdx = inits.isInitialized("userIdx") ? new QUser(forProperty("userIdx")) : null;
    }

}

