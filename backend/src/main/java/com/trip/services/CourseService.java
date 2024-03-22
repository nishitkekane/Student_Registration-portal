package com.trip.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.trip.config.requests.RegisterCourse;
import com.trip.config.responses.CourseData;
import com.trip.entities.course.Course;
import com.trip.entities.user.User;
import com.trip.repositories.CourseRepository;
import com.trip.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    public Course registerCourse(RegisterCourse request, String name) {
        Optional<User> user = userRepository.findByEmail(name);
        if (user.isEmpty())
            return null;

        Course course = Course.builder()
                .courseId(request.getCourseId())
                .name(request.getName())
                .faculty(user.get().getEmail())
                .hoursWeek(request.getHoursWeek())
                .credit(request.getCredit())
                .students(new ArrayList<>())
                .department(user.get().getDepartment())
                .build();

        return courseRepository.save(course);
    }

    public ArrayList<Course> getCourse(String teacher) {
        List<Course> courses = courseRepository.findAll();
        ArrayList<Course> teacherCourses = new ArrayList<>();

        for (Course c : courses) {
            if (c.getFaculty().equals(teacher)) {
                teacherCourses.add(c);
            }
        }
        return teacherCourses;
    }

    public boolean enroll(String courseId, String name) {
        Optional<User> user = userRepository.findByEmail(name);
        if (user.isEmpty())
            return false;

        Optional<Course> temp = courseRepository.findById(courseId);
        if (temp.isEmpty())
            return false;

        Course course = temp.get();
        List<String> students = course.getStudents();

        boolean flag = true;
        for (String t : students) {
            if (t.equals(name)) {
                flag = false;
                break;
            }
        }

        if (flag) {
            course.getStudents().add(name);
            courseRepository.save(course);
            return true;
        }
        return flag;
    }

    public ByteArrayOutputStream generateAttendance(String courseId) throws DocumentException {
        Optional<Course> byId = courseRepository.findById(courseId);
        if (byId.isEmpty())
            return null;
        Course course = byId.get();
        User faculty = userRepository.findByEmail(course.getFaculty()).get();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        document.add(new Paragraph("Course Name: " + course.getName()));
        document.add(new Paragraph("Course Id: " + course.getCourseId()));
        document.add(new Paragraph("Faculty Name: " + faculty.getFirstname() + " " + faculty.getLastname()));
        document.add(Chunk.NEWLINE);

        Font boldFont = new Font(Font.FontFamily.COURIER, 12, Font.BOLD);
        PdfPTable table = new PdfPTable(new float[] { 12, 12, 12, 12, 12, 12 });

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        table.addCell(new PdfPCell(new Phrase("Student Name", boldFont)));
        table.addCell(new PdfPCell(new Phrase("Date:" + currentDate.format(formatter), boldFont)));
        for (int i = 1; i <= 4; i++) {
            LocalDate nextDate = currentDate.plusDays(i);
            table.addCell(new PdfPCell(new Phrase("Date:" + nextDate.format(formatter), boldFont)));
        }

        course.getStudents().forEach(temp -> {
            User student = userRepository.findByEmail(temp).get();
            table.addCell(new PdfPCell(new Phrase(student.getFirstname() + " " + student.getLastname())));
            table.addCell(new PdfPCell(new Phrase()));
            table.addCell(new PdfPCell(new Phrase()));
            table.addCell(new PdfPCell(new Phrase()));
            table.addCell(new PdfPCell(new Phrase()));
            table.addCell(new PdfPCell(new Phrase()));
        });

        document.add(table);
        document.close();
        return outputStream;
    }

    public ArrayList<CourseData> getStudentCourses(String name) {
        ArrayList<CourseData> list = new ArrayList<>();

        List<Course> courses = new ArrayList<>();
        for (Course c : courses) {
            boolean flag = false;
            for (String temp : c.getStudents()) {
                if (temp.equals(name)) {
                    flag = true;
                    break;
                }
            }
            list.add(new CourseData(c, flag));
        }

        return list;
    }
}
