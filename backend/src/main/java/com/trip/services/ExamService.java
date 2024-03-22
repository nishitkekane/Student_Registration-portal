package com.trip.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.trip.config.requests.RegisterExam;
import com.trip.entities.course.Course;
import com.trip.entities.examination.Exam;
import com.trip.entities.user.User;
import com.trip.repositories.CourseRepository;
import com.trip.repositories.ExamRepository;
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
public class ExamService {

    private final ExamRepository examRepository;

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    private final UserService userService;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public Exam register(RegisterExam request) {
        Optional<Course> course = courseRepository.findById(request.getCourseId());
        if (course.isEmpty())
            return null;

        Exam exam = Exam.builder()
                .courseId(request.getCourseId())
                .type(request.getType())
                .date(LocalDate.parse(request.getDate(), formatter))
                .build();

        return examRepository.save(exam);
    }

    public Exam getExam(String courseId) {
        Optional<Exam> course = examRepository.findById(courseId);
        return course.orElse(null);
    }

    public ByteArrayOutputStream generateHallTicket(String student) throws DocumentException {
        List<Course> courses = userService.getCourses(student);
        User user = userRepository.findByEmail(student).get();
        List<Exam> exams = new ArrayList<>();

        for (Course course : courses) {
            Optional<Exam> temp = examRepository.findById(course.getCourseId());
            temp.ifPresent(exams::add);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        document.add(new Paragraph("Name: " + user.getFirstname() + " " + user.getLastname()));
        document.add(new Paragraph("Department: " + user.getDepartment()));
        document.add(new Paragraph("Id: " + user.getId()));
        document.add(Chunk.NEWLINE);

        Font boldFont = new Font(Font.FontFamily.COURIER, 12, Font.BOLD);
        PdfPTable table = new PdfPTable(new float[] { 12, 12, 12 });

        table.addCell(new PdfPCell(new Phrase("Exam Name: ", boldFont)));
        table.addCell(new PdfPCell(new Phrase("Date: ", boldFont)));
        table.addCell(new PdfPCell(new Phrase("Signature: ", boldFont)));

        exams.forEach(temp -> {
            Course course = courseRepository.findById(temp.getCourseId()).get();
            table.addCell(new PdfPCell(new Phrase(course.getName() + " " + course.getCourseId())));
            table.addCell(new PdfPCell(new Phrase(temp.getDate().toString())));
            table.addCell(new PdfPCell(new Phrase()));
        });

        document.add(table);
        document.close();
        return outputStream;
    }
}
