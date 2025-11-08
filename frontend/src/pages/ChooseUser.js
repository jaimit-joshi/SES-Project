"use client"

import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

const ChooseUser = () => {
  const navigate = useNavigate()

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate("/Adminlogin")
    } else if (user === "Student") {
      navigate("/Studentlogin")
    } else if (user === "Teacher") {
      navigate("/Teacherlogin")
    }
  }

  return (
    <div className="choose-user-container">
      <Container>
        <h2 className="text-center mb-5 text-white fw-bold">Choose Your Role</h2>

        <Row className="justify-content-center g-4">
          <Col lg={4} md={6}>
            <div className="user-card" onClick={() => navigateHandler("Admin")}>
              <div className="user-icon">
                <i className="bi bi-person-workspace"></i>
              </div>
              <h3 className="user-title">Admin</h3>
              <p className="user-description">
                Login as an administrator to access the dashboard to manage app data, users, classes, and more.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="user-card" onClick={() => navigateHandler("Student")}>
              <div className="user-icon">
                <i className="bi bi-mortarboard"></i>
              </div>
              <h3 className="user-title">Student</h3>
              <p className="user-description">
                Login as a student to explore course materials, view attendance records, and check examination results.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="user-card" onClick={() => navigateHandler("Teacher")}>
              <div className="user-icon">
                <i className="bi bi-person-video3"></i>
              </div>
              <h3 className="user-title">Teacher</h3>
              <p className="user-description">
                Login as a teacher to manage classes, track student attendance, assign marks, and monitor performance.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ChooseUser

