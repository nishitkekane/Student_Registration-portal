import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      {/* Routing functionality! */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* Home! */}
            <Route index element={<Home />} />
            {/* Cou! */}
            <Route path="courses" element={<Courses />} />
            {/* Login! */}
            <Route path="login" element={<Login />} />
            {/* Task! */}
            <Route path="pending" element={<TaskPage />} />

            {/* TODO: Add Error Page! */}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
