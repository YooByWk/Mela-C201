package com.ssafy.db.repository;

import com.ssafy.db.entity.Teamspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamspaceRepository extends JpaRepository<Teamspace, Long> {
//    save(S);
//    delete(T);
//    findOne(ID);
//    getOne(ID);
//    findAll(...);

}
