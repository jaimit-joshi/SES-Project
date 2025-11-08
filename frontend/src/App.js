"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { lightTheme, darkTheme } from "./theme/theme"
import Homepage from "./pages/Homepage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import LoginPage from "./pages/LoginPage"
import AdminRegisterPage from "./pages/admin/AdminRegisterPage"
import ChooseUser from "./pages/ChooseUser"

const App = () => {
  const { currentRole, darkMode } = useSelector((state) => state.user)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])

  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {currentRole === null && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser />} />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}

        {currentRole === "Admin" && <AdminDashboard />}
        {currentRole === "Student" && <StudentDashboard />}
        {currentRole === "Teacher" && <TeacherDashboard />}
      </Router>
    </ThemeProvider>
  )
}

export default App
