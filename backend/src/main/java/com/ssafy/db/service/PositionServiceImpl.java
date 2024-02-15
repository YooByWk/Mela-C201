//package com.ssafy.db.service;
//
//import com.ssafy.db.repository.PositionRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import javax.transaction.Transactional;
//
//@Service
//@Transactional
//public class PositionServiceImpl {
//    @Autowired
//    PositionRepository positionRepository;
//
//    //테이블이 비어있으면 레코드 추가
//    @PostConstruct
//    public void init() {
//        if(positionRepository.count() != 6) {
//            positionRepository.deleteAll();
//            positionRepository.init();
//        }
//    }
//}
