package com.ssafy.common.util;

import com.ssafy.db.entity.Feed;
import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FeedRepository;
import com.ssafy.db.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NotificationUtil {

    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    FeedRepository feedRepository;

    public Notification sendNotification(String message, User getAlarmUser){
        Notification notification = new Notification();
        notification.setUserIdx(getAlarmUser);    //알람을 받을 사용자; User 객체 타입
        notification.setAlarmContent(message);
        notification.setChecked(false);
        notification.setAlarmDate(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    public Feed addFeed(String meessage, User sendAlarmUser) {
        Feed feed = new Feed();
        feed.setUserIdx(sendAlarmUser);
        feed.setFeedContent(meessage);
        return feedRepository.save(feed);
    }

}
