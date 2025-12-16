import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register";
import StudentLayout from "./components/StudentLayout";
import PrivateRoute from "./components/PrivateRoutes";
import Courses from "./pages/Courses";
import GetEnrolledCourses from "./pages/GetEnrolledCourses";
import OpenAiRecommend from "./pages/OpenAiRecommend";
import InstructorLayout from "./components/InsructorLayout";
import InstructorCourses from "./pages/InstructorCourses";
import CreateCourse from "./pages/CreateCourse";

function App() {

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element= {<Home />}/>
        <Route path="/login" element= {<Login />}/>
        <Route path="/register" element= {<Register />}/>

        {/* Student private routes */}
        <Route element={<PrivateRoute roles={['student']}><StudentLayout /></PrivateRoute>}>
          <Route path="/courses" element= {<Courses/>}/>
          <Route path="/enrolled" element={<GetEnrolledCourses/>}/>
          <Route path="/recommend" element={<OpenAiRecommend/>}/>
        </Route>

        {/* Instructor private routes */}
        <Route element={<PrivateRoute roles={['instructor']}><InstructorLayout /></PrivateRoute>}>
          <Route path="/create" element={<CreateCourse/>}/>
          <Route path="/all" element={<InstructorCourses/>}/>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
