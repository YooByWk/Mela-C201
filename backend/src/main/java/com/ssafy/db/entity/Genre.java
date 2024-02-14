package com.ssafy.db.entity;

import com.ssafy.db.repository.GenreRepository;
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
@Table(name = "genre")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    //FIXME: 테스트
    @Column(name = "genre_idx")
    Long genreIdx;

    @NotNull
    //FIXME: 테스트
    @Column(name = "genre_name")
    String genreName;
}
