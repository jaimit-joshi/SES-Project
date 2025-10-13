"use client"

import { useSelector } from "react-redux"
import { Row, Col, Card } from "react-bootstrap"
import { useState, useEffect } from "react"

const TeacherProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [phoneNumber, setPhoneNumber] = useState("")

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  // Generate a random phone number
  useEffect(() => {
    if (currentUser && currentUser._id) {
      // Generate a completely random 10-digit number
      const areaCode = Math.floor(Math.random() * 900) + 100 // 100-999
      const prefix = Math.floor(Math.random() * 900) + 100 // 100-999
      const lineNum = Math.floor(Math.random() * 10000) // 0-9999

      // Format as a standard US phone number
      const formattedNumber = `+1 (${areaCode}) ${prefix}-${lineNum.toString().padStart(4, "0")}`
      setPhoneNumber(formattedNumber)
    }
  }, [currentUser])

  return (
    <div className="container-fluid py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div
                  className="user-avatar mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    fontSize: "48px",
                    boxShadow: "0 4px 20px rgba(0, 123, 255, 0.15)",
                  }}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="fw-bold mb-1">{currentUser.name}</h2>
                <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">Teacher</span>
              </div>

              <hr className="my-4" />

              <Row className="g-4">
                <Col md={6}>
                  <Card className="dashboard-card h-100 border-0 shadow-sm bg-light">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-briefcase-fill text-primary me-2"></i>
                        Professional Information
                      </h5>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-building-fill text-primary me-3 fs-5"></i>
                          <div>
                            <div className="text-muted small">School</div>
                            <strong>{teachSchool.schoolName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-mortarboard-fill text-primary me-3 fs-5"></i>
                          <div>
                            <div className="text-muted small">Class</div>
                            <strong>{teachSclass.sclassName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-book-fill text-primary me-3 fs-5"></i>
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
                  <Card className="dashboard-card h-100 border-0 shadow-sm bg-light">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-person-lines-fill text-primary me-2"></i>
                        Contact Information
                      </h5>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                          <div>
                            <div className="text-muted small">Email</div>
                            <strong>{currentUser.email}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                          <div>
                            <div className="text-muted small">Phone</div>
                            <strong>{phoneNumber}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-white rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                          <div>
                            <div className="text-muted small">Address</div>
                            <strong>School Campus</strong>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="mt-4 text-center">
                <button className="btn btn-outline-primary me-2">
                  <i className="bi bi-pencil me-1"></i> Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-printer me-1"></i> Print Details
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TeacherProfile
