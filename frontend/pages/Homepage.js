import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import Students from "../assets/19925.jpg"

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="homepage-title">
                Welcome to
                <span className="d-block text-primary">School Management</span>
                System
              </h1>
              <p className="homepage-subtitle">
                Streamline school management, class organization, and add students and faculty. Seamlessly track
                attendance, assess performance, and provide feedback. Access records, view marks, and communicate
                effortlessly.
              </p>
              <div className="d-grid gap-3 d-md-flex">
                <Link to="/choose">
                  <Button variant="primary" size="lg" className="px-4 py-3">
                    Login <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                </Link>
                <Link to="/Adminregister">
                  <Button variant="outline-primary" size="lg" className="px-4 py-3">
                    Register <i className="bi bi-person-plus ms-2"></i>
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src={Students || "/placeholder.svg"}
                alt="Students"
                className="homepage-image img-fluid"
                style={{ maxWidth: "80%" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Homepage

