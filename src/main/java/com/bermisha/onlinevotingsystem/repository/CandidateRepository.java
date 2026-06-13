package com.bermisha.onlinevotingsystem.repository;

import com.bermisha.onlinevotingsystem.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
}