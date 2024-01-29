package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserSencEmailPostRequest")
public class UserSendEmailPostReq {

    @ApiModelProperty(name="유저 email id", example="your_email_id")
    String emailId;

}
