import { useNavigate } from "react-router-dom";
import Course from "../components/addCourse";
import Exam from "../components/addExam";
import { useEffect } from "react";
function Courses() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

 
  
  if(token && role === "TEACHER"){
    return <Course />
  }
  else if(token && role === "ADMIN") {
    return <Exam />
  }
}

export default Courses;
