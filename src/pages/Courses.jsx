import Course from "./addCourse";
function Courses() {
  const role = localStorage.getItem("role");
  return <Course />;
}

export default Courses;
