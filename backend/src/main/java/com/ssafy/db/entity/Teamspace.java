package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Teamspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long teamspaceIdx;

    @NotNull
    String teamName;
    @NotNull
    LocalDateTime startDate;
    @NotNull
    LocalDateTime endDate;
    @NotNull
    String host;
}
