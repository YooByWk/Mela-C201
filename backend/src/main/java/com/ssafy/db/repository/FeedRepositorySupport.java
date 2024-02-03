package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FeedRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QFeed qFeed = QFeed.feed;
    QFollow qFollow = QFollow.follow;

    public List<Feed> getFeed(User user) {
        List<Feed> feeds = jpaQueryFactory
                .select(qFeed)
                .from(qFeed)
                .join(qFollow)
                .on(qFeed.userIdx.eq(qFollow.followe))
                .where(qFollow.follower.eq(user))
                .orderBy(qFeed.feedIdx.desc())
                .fetch();

        return feeds;
    }
}
