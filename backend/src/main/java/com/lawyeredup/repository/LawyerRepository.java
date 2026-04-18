package com.lawyeredup.repository;
import com.lawyeredup.model.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;
public interface LawyerRepository extends JpaRepository<Lawyer, Long> {}
