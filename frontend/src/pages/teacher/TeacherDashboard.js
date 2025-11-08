import { Navigate, Route, Routes } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import TeacherHomePage from "./TeacherHomePage"
import TeacherProfile from "./TeacherProfile"
import EditTeacherProfile from "./EditTeacherProfile"
import TeacherClassDetails from "./TeacherClassDetails"
import TeacherComplain from "./TeacherComplain"
import TeacherViewStudent from "./TeacherViewStudent"
import StudentAttendance from "../admin/studentRelated/StudentAttendance"
import StudentExamMarks from "../admin/studentRelated/StudentExamMarks"
import Logout from "../Logout"

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="Teacher">
      <Routes>
        <Route path="/" element={<TeacherHomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
        <Route path="/Teacher/profile" element={<TeacherProfile />} />
        <Route path="/Teacher/profile/edit" element={<EditTeacherProfile />} />
        <Route path="/Teacher/complain" element={<TeacherComplain />} />
        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
        <Route
          path="/Teacher/class/student/attendance/:studentID/:subjectID"
          element={<StudentAttendance situation="Subject" />}
        />
        <Route
          path="/Teacher/class/student/marks/:studentID/:subjectID"
          element={<StudentExamMarks situation="Subject" />}
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </DashboardLayout>
  )
}

export default TeacherDashboard
