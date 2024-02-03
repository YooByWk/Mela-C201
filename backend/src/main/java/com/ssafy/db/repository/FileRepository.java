package com.ssafy.db.repository;

import com.ssafy.db.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<com.ssafy.db.entity.File> findBySaveFilenameAndSavePath(String savePath, String saveFilename);
}
