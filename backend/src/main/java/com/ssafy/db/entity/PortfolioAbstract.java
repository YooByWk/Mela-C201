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
public class PortfolioAbstract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long portfolioAbstractIdx;

    String youtube;
    String instagram;
    String selfIntro;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="USER_IDX", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="PORTFOLIO_PICTURE_FILE_IDX", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    File portfolio_picture_file_idx;
}
