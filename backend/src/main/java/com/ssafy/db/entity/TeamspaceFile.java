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
public class TeamspaceFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long TeamspaceFileIdx;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="teamspace_idx", referencedColumnName="teamspaceIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Teamspace teamspaceIdx;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="file_idx", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    com.ssafy.db.entity.File file;

    @Override
    public String toString() {
        return "TeamspaceFile{" +
                "TeamspaceFileIdx=" + TeamspaceFileIdx +
                ", teamspaceIdx=" + teamspaceIdx +
                ", file=" + file +
                '}';
    }
}