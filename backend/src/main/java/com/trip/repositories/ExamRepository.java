package com.trip.repositories;

import com.trip.entities.examination.Exam;
import com.trip.entities.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, String> {

}
