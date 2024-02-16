package com.ssafy.db.repository;

import com.ssafy.db.entity.TeamspaceFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamspaceFileRepository extends JpaRepository<TeamspaceFile, Long> {
}