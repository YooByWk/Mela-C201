package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long userIdx;

    @Column(unique=true)
    @NotNull
    String emailId;

    @NotNull
    String emailDomain;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    String password;
    @NotNull
    String name;
    @NotNull
    String nickname;
    @NotNull
    String gender;
    @NotNull
    LocalDateTime birth;

    @NotNull
    String userType;
    @NotNull
    Boolean searchAllow;

    @NotNull
    int followerNum = 0;
    @NotNull
    int followeeNum = 0;


}
