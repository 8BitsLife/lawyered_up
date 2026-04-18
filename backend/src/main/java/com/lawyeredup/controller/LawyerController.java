package com.lawyeredup.controller;
import com.lawyeredup.model.Lawyer;
import com.lawyeredup.repository.LawyerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
@CrossOrigin
public class LawyerController {
 private final LawyerRepository repo;
 public LawyerController(LawyerRepository r){this.repo=r;}
 @GetMapping public List<Lawyer> getAll(){return repo.findAll();}
 @PostMapping public Lawyer create(@RequestBody Lawyer l){return repo.save(l);}
}
