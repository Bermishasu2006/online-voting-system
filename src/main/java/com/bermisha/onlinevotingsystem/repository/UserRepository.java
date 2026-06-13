package com.bermisha.onlinevotingsystem.repository;

import com.bermisha.onlinevotingsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByVoterId(String voterId);

}