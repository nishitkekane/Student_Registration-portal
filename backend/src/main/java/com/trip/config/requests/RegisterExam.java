package com.trip.config.requests;

import com.trip.entities.examination.Type;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterExam {

    private String courseId;

    private Type type;

    private String date;
}
