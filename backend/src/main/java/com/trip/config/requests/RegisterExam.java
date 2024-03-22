package com.trip.config.requests;

import com.trip.entities.examination.Type;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class RegisterExam {

    private String courseId;

    private Type type;

    private String date;
}
