package com.bermisha.onlinevotingsystem.controller;

import com.bermisha.onlinevotingsystem.entity.Candidate;
import com.bermisha.onlinevotingsystem.entity.User;
import com.bermisha.onlinevotingsystem.entity.Vote;
import com.bermisha.onlinevotingsystem.repository.CandidateRepository;
import com.bermisha.onlinevotingsystem.repository.UserRepository;
import com.bermisha.onlinevotingsystem.repository.VoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class VotingController {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public VotingController(CandidateRepository candidateRepository,
                            UserRepository userRepository,
                            VoteRepository voteRepository) {
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
    }

    @GetMapping("/candidates")
    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }

    @GetMapping("/results")
    public List<Candidate> getResults() {
        return candidateRepository.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        List<User> users = userRepository.findAll();

        for (User u : users) {
            if (u.getVoterId().equals(user.getVoterId())
                    && u.getPassword().equals(user.getPassword())) {
                return "Login Success";
            }
        }

        return "Invalid Credentials";
    }

    @PostMapping("/vote")
    public String vote(@RequestParam String voterId,
                       @RequestParam Integer candidateId) {

        User user = userRepository.findByVoterId(voterId);

        if (user == null) {
            return "Invalid User";
        }

        if (user.getHasVoted()) {
            return "Already Voted";
        }

        Candidate candidate = candidateRepository.findById(candidateId).orElse(null);

        if (candidate == null) {
            return "Invalid Candidate";
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setCandidate(candidate);
        voteRepository.save(vote);

        candidate.setVoteCount(candidate.getVoteCount() + 1);
        candidateRepository.save(candidate);

        user.setHasVoted(true);
        userRepository.save(user);

        return "Vote Submitted";
    }
}