package com.ssafy.db.repository;

import com.ssafy.db.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<com.ssafy.db.entity.File> findBySavePathAndSaveFilename(String savePath, String saveFilename);
    Optional<com.ssafy.db.entity.File> findBySaveFilenameAndSavePath(String savePath, String saveFilename);
}
