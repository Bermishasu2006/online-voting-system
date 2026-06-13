package com.bermisha.onlinevotingsystem.repository;

import com.bermisha.onlinevotingsystem.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
}