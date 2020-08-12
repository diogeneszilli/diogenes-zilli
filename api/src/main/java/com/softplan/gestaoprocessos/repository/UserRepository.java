package com.softplan.gestaoprocessos.repository;

import com.softplan.gestaoprocessos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(Long id);
    User findUserByName(String name);
}
