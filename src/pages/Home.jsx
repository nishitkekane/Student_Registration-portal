import Teacher from "./addTeacher";
import Student from "./addStudent";
const Home = () => {
  const role = localStorage.getItem('role');
  return (
    
      // role=="ADMIN" ? (
        <Teacher/>
      // ) : (
      //   <Student/>
      // )
  );
}

export default Home
