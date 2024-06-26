package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class TeamspaceMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long teamspaceMemberIdx;

    @ManyToOne
    @JoinColumn(name="teamspace_idx", referencedColumnName="teamspaceIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Teamspace teamspaceIdx;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;
}
