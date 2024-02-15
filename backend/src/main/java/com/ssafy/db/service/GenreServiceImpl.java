//package com.ssafy.db.service;
//
//import com.ssafy.db.repository.GenreRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import javax.transaction.Transactional;
//
//@Service
//@Transactional
//public class GenreServiceImpl implements GenreService {
//    @Autowired
//    GenreRepository genreRepository;
//
//    @PostConstruct
//    public void init() {
//        if(genreRepository.count() != 13) {
//            genreRepository.deleteAll();
//            genreRepository.init();
//        }
//    }
//}
