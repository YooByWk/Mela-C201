package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long userIdx;

    @Column(length = 25)
    @NotNull
    String emailId;

    @NotNull
    @Column(length = 25)
    String emailDomain;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    String password;

    @Column(length = 25)
    @NotNull
    String name;

    @Column(length = 25)
    @NotNull
    String nickname;

    @NotNull
    @Column(columnDefinition = "VARCHAR(10) CHARACTER SET UTF8")
    String gender;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate birth;

    @NotNull
    //@ColumnDefault("unauth")
    @Column(length = 10)
    String userType;

    @NotNull
    //@ColumnDefault("false")
    Boolean searchAllow;

    String jwtToken;

    @Override
    public String toString() {
        return "User{" +
                "userIdx=" + userIdx +
                ", emailId='" + emailId + '\'' +
                ", emailDomain='" + emailDomain + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", gender='" + gender + '\'' +
                ", birth=" + birth +
                ", userType='" + userType + '\'' +
                ", searchAllow=" + searchAllow +
                ", jwtToken='" + jwtToken + '\'' +
                '}';
    }

}
