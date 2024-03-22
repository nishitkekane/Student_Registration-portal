package com.trip.config.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterCourse {

    private String courseId;

    private String name;

    private Double hoursWeek;

    private Double credit;
}
