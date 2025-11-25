"use client"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useTheme } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle"

const StudentProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { subjectsList } = useSelector((state) => state.sclass)
  const navigate = useNavigate()
  const theme = useTheme()
  const dispatch = useDispatch()

  const sclassName = typeof currentUser.sclassName === 'object' 
    ? currentUser.sclassName?.sclassName 
    : currentUser.sclassName

  const studentSchool = typeof currentUser.school === 'object' 
    ? currentUser.school?.schoolName 
    : currentUser.school

  useEffect(() => {
    console.log("[v0] Current user:", currentUser)
    console.log("[v0] Current user sclassName:", currentUser.sclassName)

    const classID = typeof currentUser.sclassName === "object" ? currentUser.sclassName._id : currentUser.sclassName

    if (classID) {
      console.log("[v0] Fetching subjects for class ID:", classID)
      dispatch(getSubjectList(classID, "ClassSubjects"))
    } else {
      console.log("[v0] No valid class ID found")
    }
  }, [dispatch, currentUser]) // Updated dependency to currentUser

  useEffect(() => {
    console.log("[v0] Subjects list updated:", subjectsList)
  }, [subjectsList])

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="dashboard-card">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="user-avatar mx-auto mb-3" style={{ width: "100px", height: "100px", fontSize: "40px" }}>
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="fw-bold">{currentUser.name}</h2>
                <span
                  className="badge px-3 py-2"
                  style={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}
                >
                  Student
                </span>
              </div>

              <hr className="my-4" />

              <Row className="g-4">
                <Col md={6}>
                  <Card className="dashboard-card h-100">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">Academic Information</h5>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-building me-2" style={{ color: theme.palette.primary.main }}></i>
                          <strong className="me-2">School:</strong>
                          <span className="text-muted">{studentSchool || 'Not Available'}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-mortarboard me-2" style={{ color: theme.palette.primary.main }}></i>
                          <strong className="me-2">Class:</strong>
                          <span className="text-muted">{sclassName || 'Not Available'}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-badge me-2" style={{ color: theme.palette.primary.main }}></i>
                          <strong className="me-2">Roll Number:</strong>
                          <span className="text-muted">{currentUser.rollNum}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="dashboard-card h-100">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">Personal Information</h5>

                      {currentUser.email && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-envelope me-2" style={{ color: theme.palette.primary.main }}></i>
                            <strong className="me-2">Email:</strong>
                            <span className="text-muted">{currentUser.email}</span>
                          </div>
                        </div>
                      )}

                      {currentUser.phone && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-telephone me-2" style={{ color: theme.palette.primary.main }}></i>
                            <strong className="me-2">Phone:</strong>
                            <span className="text-muted">{currentUser.phone}</span>
                          </div>
                        </div>
                      )}

                      {currentUser.address && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-house me-2" style={{ color: theme.palette.primary.main }}></i>
                            <strong className="me-2">Address:</strong>
                            <span className="text-muted">{currentUser.address}</span>
                          </div>
                        </div>
                      )}

                      {currentUser.dateOfBirth && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar me-2" style={{ color: theme.palette.primary.main }}></i>
                            <strong className="me-2">Date of Birth:</strong>
                            <span className="text-muted">{new Date(currentUser.dateOfBirth).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card className="dashboard-card">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">
                        <i className="bi bi-book me-2" style={{ color: theme.palette.primary.main }}></i>
                        Enrolled Subjects
                      </h5>
                      {subjectsList && subjectsList.length > 0 ? (
                        <Row className="g-3">
                          {subjectsList.map((subject, index) => (
                            <Col md={6} lg={4} key={index}>
                              <Card
                                className="h-100 border"
                                style={{ borderLeft: `4px solid ${theme.palette.primary.main}` }}
                              >
                                <Card.Body>
                                  <h6 className="fw-bold mb-2">{subject.subName}</h6>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted small">
                                      <i className="bi bi-code-square me-1"></i>
                                      {subject.subCode}
                                    </span>
                                    <span className="badge bg-light text-dark">{subject.sessions} sessions</span>
                                  </div>
                                  {subject.teacher && (
                                    <div className="mt-2 text-muted small">
                                      <i className="bi bi-person me-1"></i>
                                      {subject.teacher.name || "Teacher Assigned"}
                                    </div>
                                  )}
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <div className="text-center text-muted py-3">
                          <i className="bi bi-inbox" style={{ fontSize: "2rem" }}></i>
                          <p className="mt-2">No subjects enrolled yet</p>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                {currentUser.examResult && currentUser.examResult.length > 0 && (
                  <Col md={12}>
                    <Card className="dashboard-card">
                      <Card.Body className="p-4">
                        <h5 className="card-title fw-bold mb-3">
                          <i className="bi bi-trophy me-2" style={{ color: theme.palette.primary.main }}></i>
                          Exam Results Overview
                        </h5>
                        <Row className="g-3">
                          {currentUser.examResult.map((result, index) => {
                            let subjectName = "Unknown Subject"

                            if (result.subName && typeof result.subName === "object" && result.subName.subName) {
                              subjectName = result.subName.subName
                            } else if (
                              result.subName &&
                              typeof result.subName === "string" &&
                              subjectsList &&
                              subjectsList.length > 0
                            ) {
                              const matchedSubject = subjectsList.find((subject) => subject._id === result.subName)
                              if (matchedSubject) {
                                subjectName = matchedSubject.subName
                              }
                            } else if (subjectsList && subjectsList.length > 0 && subjectsList[index]) {
                              subjectName = subjectsList[index].subName
                            }

                            const marks = result.marksObtained ?? 0
                            const status = marks >= 60 ? "Passed" : marks >= 40 ? "Average" : "Needs Improvement"
                            const statusColor = marks >= 60 ? "success" : marks >= 40 ? "warning" : "danger"

                            return (
                              <Col md={6} lg={4} key={index}>
                                <Card className="h-100 border">
                                  <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                      <h6 className="fw-bold mb-0">{subjectName}</h6>
                                      <span className={`badge bg-${statusColor}`}>{status}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="text-muted">Score:</span>
                                      <span className="h4 mb-0 fw-bold" style={{ color: theme.palette.primary.main }}>
                                        {marks}/100
                                      </span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            )
                          })}
                        </Row>
                        <div className="text-center mt-3">
                          <Button variant="outline-primary" onClick={() => navigate("/Student/subjects")}>
                            View Detailed Results
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}

                <Col md={12}>
                  <Card className="dashboard-card">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">
                        <i className="bi bi-bell me-2" style={{ color: theme.palette.primary.main }}></i>
                        Notification Preferences
                      </h5>
                      <Row>
                        <Col md={6}>
                          <div className="mb-2">
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
                          <div className="mb-2">
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

              <div className="text-center mt-4">
                <Button variant="primary" onClick={() => navigate("/Student/profile/edit")}>
                  <i className="bi bi-pencil me-2"></i>Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StudentProfile
