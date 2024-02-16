package com.ssafy.api.user.request;

import com.ssafy.db.entity.Genre;
import com.ssafy.db.entity.Position;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 유저 회원정보 수정 API ([PUT] /api/v1/users/me) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePostRequest")
public class UserUpdatePostReq {
    @ApiModelProperty(name="유저 name", example = "Soham Kim")
    String name;

    @ApiModelProperty(name="유저 nickname", example = "Soham")
    String nickname;

    @ApiModelProperty(name="유저 gender", example = "Woman")
    String gender;

    @ApiModelProperty(name="유저 birth", example = "1992-12-25")
    LocalDate birth;

    @ApiModelProperty(name="유저 search_allow", example = "true")
    boolean searchAllow;

    @ApiModelProperty(name="유저 장르", example = "Pop")
    List<String> genre;

    @ApiModelProperty(name="유저 포지션", example = "보컬")
    List<String> position;

    @Override
    public String toString() {
        return "UserUpdatePostReq{" +
                "name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", gender='" + gender + '\'' +
                ", birth=" + birth +
                ", searchAllow=" + searchAllow +
                ", genre=" + genre +
                ", position=" + position +
                '}';
    }
}
