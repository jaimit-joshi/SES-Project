import { Navigate, Route, Routes } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import StudentHomePage from "./StudentHomePage"
import StudentProfile from "./StudentProfile"
import EditStudentProfile from "./EditStudentProfile"
import StudentSubjects from "./StudentSubjects"
import ViewStdAttendance from "./ViewStdAttendance"
import StudentComplain from "./StudentComplain"
import Logout from "../Logout"

const StudentDashboard = () => {
  return (
    <DashboardLayout role="Student">
      <Routes>
        <Route path="/" element={<StudentHomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Student/dashboard" element={<StudentHomePage />} />
        <Route path="/Student/profile" element={<StudentProfile />} />
        <Route path="/Student/profile/edit" element={<EditStudentProfile />} />
        <Route path="/Student/subjects" element={<StudentSubjects />} />
        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
        <Route path="/Student/complain" element={<StudentComplain />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </DashboardLayout>
  )
}

export default StudentDashboard
