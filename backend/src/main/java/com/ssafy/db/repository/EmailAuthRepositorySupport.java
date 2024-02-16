package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QEmailAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class EmailAuthRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QEmailAuth qEmailAuth = QEmailAuth.emailAuth;

}
