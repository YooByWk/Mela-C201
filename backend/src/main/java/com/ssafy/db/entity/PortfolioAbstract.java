package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.annotation.Nullable;
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

    //You can use optional tag for null control: - https://stackoverflow.com/questions/38566417/detached-entity-error-caused-by-cascade-attribute
    @OneToOne(cascade = CascadeType.ALL, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name="USER_IDX", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;


    //You can use optional tag for null control: - https://stackoverflow.com/questions/38566417/detached-entity-error-caused-by-cascade-attribute
    @OneToOne(cascade = CascadeType.ALL, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name="PORTFOLIO_PICTURE_FILE_IDX", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Nullable
    File portfolio_picture_file_idx;

    @Override
    public String toString() {
        return "PortfolioAbstract{" +
                "portfolioAbstractIdx=" + portfolioAbstractIdx +
                ", youtube='" + youtube + '\'' +
                ", instagram='" + instagram + '\'' +
                ", selfIntro='" + selfIntro + '\'' +
                ", userIdx=" + userIdx +
                ", portfolio_picture_file_idx=" + portfolio_picture_file_idx +
                '}';
    }
}
