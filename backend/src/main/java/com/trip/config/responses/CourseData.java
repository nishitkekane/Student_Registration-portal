package com.trip.config.responses;

import com.trip.entities.course.Course;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CourseData {

   public CourseData(Course c, boolean flag) {
      this.course = c;
      this.enrolled = flag;
   }

   private Course course;

   private boolean enrolled;
}
