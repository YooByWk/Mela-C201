package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FileRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QFile qFile = QFile.file;
}
