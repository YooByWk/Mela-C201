package com.ssafy.db.service;

import com.ssafy.db.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@Transactional
public class PositionServiceImpl {
    //FIXME: 테스트 중! (테이블이 비어있으면 레코드 추가)
    @Autowired
    PositionRepository positionRepository;

    //FIXME: 테스트 중! (테이블이 비어있으면 레코드 추가)
    @PostConstruct
    public void init() {
        System.err.println("PositionRepository init 실행됨!");

        if(positionRepository.count() != 6) {
            System.err.println("PositionRepository 조건문");
            positionRepository.deleteAll();
            positionRepository.init();
        }
    }
}
