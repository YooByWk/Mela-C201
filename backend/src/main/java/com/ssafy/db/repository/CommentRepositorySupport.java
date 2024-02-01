package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommentRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QComment qComment = QComment.comment;
}
