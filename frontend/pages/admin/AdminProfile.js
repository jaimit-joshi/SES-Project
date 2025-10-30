"use client"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

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
                <span className="badge bg-primary px-3 py-2">Administrator</span>
              </div>

              <hr className="my-4" />

              <Row className="g-4">
                <Col md={6}>
                  <Card className="dashboard-card h-100">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">Personal Information</h5>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person text-primary me-2"></i>
                          <strong className="me-2">Name:</strong>
                          <span className="text-muted">{currentUser.name}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope text-primary me-2"></i>
                          <strong className="me-2">Email:</strong>
                          <span className="text-muted">{currentUser.email}</span>
                        </div>
                      </div>

                      {currentUser.phone && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-telephone text-primary me-2"></i>
                            <strong className="me-2">Phone:</strong>
                            <span className="text-muted">{currentUser.phone}</span>
                          </div>
                        </div>
                      )}

                      {currentUser.address && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-house text-primary me-2"></i>
                            <strong className="me-2">Address:</strong>
                            <span className="text-muted">{currentUser.address}</span>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="dashboard-card h-100">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">School Information</h5>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-building text-primary me-2"></i>
                          <strong className="me-2">School:</strong>
                          <span className="text-muted">{currentUser.schoolName}</span>
                        </div>
                      </div>

                      {currentUser.dateOfBirth && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar text-primary me-2"></i>
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
                        <i className="bi bi-bell text-primary me-2"></i>
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
                <Button variant="primary" onClick={() => navigate("/Admin/profile/edit")}>
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

export default AdminProfile
