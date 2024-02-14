package com.ssafy.db.service;

import com.ssafy.db.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@Transactional
public class GenreServiceImpl implements GenreService {
    //FIXME: 테스트 중! (테이블이 비어있으면 레코드 추가)
    @Autowired
    GenreRepository genreRepository;

    //FIXME: 테스트 중! (테이블이 비어있으면 레코드 추가)
    @PostConstruct
    public void init() {
        System.err.println("GenreRepository init 실행됨!");

        if(genreRepository.count() != 13) {
            System.err.println("GenreRepository 조건문");
            genreRepository.deleteAll();
            genreRepository.init();
        }
    }
}
