import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../components/addCourse";
import Exam from "../components/addExam";
import axios from "axios";
import { Button } from "@/components/ui/button";
function Courses() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const generateAttendance = async (courseId, e) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/course/attendance?id=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the downloaded file
      link.setAttribute("download", "attendance_report.pdf");

      // Append the link to the body
      document.body.appendChild(link);

      // Click the link to initiate download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating attendance:", error);
      // setMessage("Error generating attendance. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate("/login");
        } else if (role === "TEACHER") {
          const response = await axios.get(
            "http://localhost:8080/api/v1/course/get",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Courses retrieved successfully:", response.data);
          setCourses(response.data);
        } else if (role === "STUDENT") {
          const response = await axios.get(
            "http://localhost:8080/api/v1/course/getUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User courses retrieved successfully:", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token, navigate, role]);

  if (token && role === "TEACHER") {
    return (
      <div className="flex">
        <Course className="inline w-2/5" />
        <div
          className="flex min-h-screen flex-col items-end justify-between p-24 bg-black-100 font-montserrat inline"
          style={{ fontSize: "1.3rem" }}
        >
          <div className=" bg-teal-200 mt-6 space-y-0 shadow-2xl shadow-black rounded-2xl max-lg:flex-col max-lg:space-y-8 p-16 inline">
            <div>
              <h1 className="text-3xl font-bold mb-6">All Courses</h1>
              <div className="flex">
                {courses.map((course) => (
                  <div key={course.courseId} className="m-4">
                    <h2>{course.name}</h2>
                    <p>Credits: {course.credit}</p>
                    <p>Hours per week: {course.hoursWeek}</p>
                    <Button
                      className="mt-1"
                      onClick={() => generateAttendance(course.courseId)}
                    >
                      Generate Attendance
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (token && role === "ADMIN") {
    return (
      <div className="flex">
        {/* <Course className="inline w-2/5" /> */}
        <Exam />
      </div>
    );
  } else {
    return <div className="flex"></div>;
  }
}

export default Courses;
