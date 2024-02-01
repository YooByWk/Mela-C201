package com.ssafy.api.user.response;

import com.ssafy.db.entity.Feed;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedResponse")
public class FeedRes {
    @ApiModelProperty(name = "feed idx")
    Long feedIdx;

    @ApiModelProperty(name = "user")
    User user;

    @ApiModelProperty(name = "contents")
    String feedContent;

    public static FeedRes of(Feed feed) {
        FeedRes res = new FeedRes();
        res.setFeedIdx(feed.getFeedIdx());
        res.setUser(feed.getUserIdx());
        res.setFeedContent(feed.getFeedContent());
        return res;
    }
}
