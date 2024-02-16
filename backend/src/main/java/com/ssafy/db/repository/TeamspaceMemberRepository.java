package com.ssafy.db.repository;

import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.TeamspaceMember;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamspaceMemberRepository extends JpaRepository<TeamspaceMember, Long> {

    Optional<TeamspaceMember> findByUserIdxAndTeamspaceIdx(User userIdx, Teamspace teamspaceIdx);
}
