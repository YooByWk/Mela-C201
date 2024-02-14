package com.ssafy.db.entity;

import com.ssafy.db.repository.GenreRepository;
import com.ssafy.db.repository.PositionRepository;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import javax.persistence.*;

@Entity
@Getter
@Setter
//FIXME: 테스트
@Table(name = "position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    //FIXME: 테스트
    @Column(name = "position_idx")
    Long positionIdx;

    @NotNull
    //FIXME: 테스트
    @Column(name = "position_name")
    String positionName;

}
