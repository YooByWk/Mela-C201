package com.ssafy.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QFollow;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class FollowRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QFollow qFollow = QFollow.follow;

    public List<User> findUserFollower(User user){

        List<User> resultFollowee = jpaQueryFactory
                .select(Projections.bean(User.class, qUser.emailId, qUser.emailDomain, qUser.name, qUser.nickname))
                .from(qFollow)
                .join(qUser).on(qFollow.followe.eq(qUser))
                .where(qFollow.follower.eq(user))
                .fetch().stream().distinct().collect(Collectors.toList());


        return resultFollowee;
    }

    public List<User> findUserFollowee(User user){

        List<User> resultFollowee = jpaQueryFactory
                .select(Projections.bean(User.class, qUser.emailId, qUser.emailDomain, qUser.name, qUser.nickname))
                .from(qFollow)
                .join(qUser).on(qFollow.follower.eq(qUser))
                .where(qFollow.followe.eq(user))
                .fetch().stream().distinct().collect(Collectors.toList());


        return resultFollowee;
    }
}
