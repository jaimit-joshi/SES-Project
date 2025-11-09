"use client"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useTheme } from "@mui/material"

const TeacherProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const theme = useTheme()

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <div className="container-fluid py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div
                  className="user-avatar mx-auto mb-3 d-flex align-items-center justify-content-center text-white rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    fontSize: "48px",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: `0 4px 20px ${theme.palette.mode === "dark" ? "rgba(157, 125, 227, 0.3)" : "rgba(0, 123, 255, 0.15)"}`,
                  }}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="fw-bold mb-1">{currentUser.name}</h2>
                <span
                  className="badge px-3 py-2 rounded-pill fs-6 shadow-sm"
                  style={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}
                >
                  Teacher
                </span>
              </div>

              <hr className="my-4" />

              <Row className="g-4">
                <Col md={6}>
                  <Card className="dashboard-card h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-briefcase-fill me-2" style={{ color: theme.palette.primary.main }}></i>
                        Professional Information
                      </h5>

                      <div
                        className="mb-3 p-3 rounded"
                        style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center">
                          <i
                            className="bi bi-building-fill me-3 fs-5"
                            style={{ color: theme.palette.primary.main }}
                          ></i>
                          <div>
                            <div className="text-muted small">School</div>
                            <strong>{teachSchool.schoolName}</strong>
                          </div>
                        </div>
                      </div>

                      <div
                        className="mb-3 p-3 rounded"
                        style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center">
                          <i
                            className="bi bi-mortarboard-fill me-3 fs-5"
                            style={{ color: theme.palette.primary.main }}
                          ></i>
                          <div>
                            <div className="text-muted small">Class</div>
                            <strong>{teachSclass.sclassName}</strong>
                          </div>
                        </div>
                      </div>

                      <div
                        className="mb-3 p-3 rounded"
                        style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center">
                          <i className="bi bi-book-fill me-3 fs-5" style={{ color: theme.palette.primary.main }}></i>
                          <div>
                            <div className="text-muted small">Subject</div>
                            <strong>{teachSubject.subName}</strong>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="dashboard-card h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-person-lines-fill me-2" style={{ color: theme.palette.primary.main }}></i>
                        Contact Information
                      </h5>

                      <div
                        className="mb-3 p-3 rounded"
                        style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center">
                          <i
                            className="bi bi-envelope-fill me-3 fs-5"
                            style={{ color: theme.palette.primary.main }}
                          ></i>
                          <div>
                            <div className="text-muted small">Email</div>
                            <strong>{currentUser.email}</strong>
                          </div>
                        </div>
                      </div>

                      {currentUser.phone && (
                        <div
                          className="mb-3 p-3 rounded"
                          style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                        >
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-telephone-fill me-3 fs-5"
                              style={{ color: theme.palette.primary.main }}
                            ></i>
                            <div>
                              <div className="text-muted small">Phone</div>
                              <strong>{currentUser.phone}</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentUser.address && (
                        <div
                          className="mb-3 p-3 rounded"
                          style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                        >
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-geo-alt-fill me-3 fs-5"
                              style={{ color: theme.palette.primary.main }}
                            ></i>
                            <div>
                              <div className="text-muted small">Address</div>
                              <strong>{currentUser.address}</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentUser.dateOfBirth && (
                        <div
                          className="mb-3 p-3 rounded"
                          style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                        >
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-calendar-fill me-3 fs-5"
                              style={{ color: theme.palette.primary.main }}
                            ></i>
                            <div>
                              <div className="text-muted small">Date of Birth</div>
                              <strong>{new Date(currentUser.dateOfBirth).toLocaleDateString()}</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card className="dashboard-card border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-bell-fill me-2" style={{ color: theme.palette.primary.main }}></i>
                        Notification Preferences
                      </h5>
                      <Row>
                        <Col md={6}>
                          <div
                            className="mb-2 p-3 rounded"
                            style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                          >
                            <i
                              className={`bi ${currentUser.notificationPreferences?.email ? "bi-check-circle-fill text-success" : "bi-x-circle-fill text-muted"} me-2`}
                            ></i>
                            <strong>Email Notifications:</strong>
                            <span className="ms-2 text-muted">
                              {currentUser.notificationPreferences?.email ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div
                            className="mb-2 p-3 rounded"
                            style={{ backgroundColor: theme.palette.mode === "dark" ? "#1a202c" : "#f8f9fa" }}
                          >
                            <i
                              className={`bi ${currentUser.notificationPreferences?.sms ? "bi-check-circle-fill text-success" : "bi-x-circle-fill text-muted"} me-2`}
                            ></i>
                            <strong>SMS Notifications:</strong>
                            <span className="ms-2 text-muted">
                              {currentUser.notificationPreferences?.sms ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="mt-4 text-center">
                <Button variant="primary" onClick={() => navigate("/Teacher/profile/edit")}>
                  <i className="bi bi-pencil me-1"></i> Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TeacherProfile
