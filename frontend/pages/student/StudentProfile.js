import { useSelector } from "react-redux"
import { Row, Col, Card } from "react-bootstrap"

const StudentProfile = () => {
  const { currentUser } = useSelector((state) => state.user)

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

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
                <span className="badge bg-primary px-3 py-2">Student</span>
              </div>

              <hr className="my-4" />

              <Row className="g-4">
                <Col md={6}>
                  <Card className="dashboard-card h-100">
                    <Card.Body className="p-4">
                      <h5 className="card-title fw-bold mb-3">Academic Information</h5>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-building text-primary me-2"></i>
                          <strong className="me-2">School:</strong>
                          <span className="text-muted">{studentSchool.schoolName}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-mortarboard text-primary me-2"></i>
                          <strong className="me-2">Class:</strong>
                          <span className="text-muted">{sclassName.sclassName}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-badge text-primary me-2"></i>
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

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope text-primary me-2"></i>
                          <strong className="me-2">Email:</strong>
                          <span className="text-muted">student@example.com</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-telephone text-primary me-2"></i>
                          <strong className="me-2">Phone:</strong>
                          <span className="text-muted">(123) 456-7890</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-house text-primary me-2"></i>
                          <strong className="me-2">Address:</strong>
                          <span className="text-muted">123 Main Street, City, Country</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StudentProfile

