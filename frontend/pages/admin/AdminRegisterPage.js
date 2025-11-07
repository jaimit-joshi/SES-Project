"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Form, Button, InputGroup, Spinner, Card } from "react-bootstrap"
import { registerUser } from "../../redux/userRelated/userHandle"
import bgpic from "frontend/assets/designlogin.jpg"
frontend/assets/designlogin.jpg
const AdminRegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const { name, email, password, schoolName } = formData
    if (!name || !email || !password || !schoolName) {
      setAlertMessage("Please fill all required fields")
      setShowAlert(true)
      setLoading(false)
      return
    }

    dispatch(registerUser({ name, email, password, role: "Admin", schoolName }, "Admin"))
  }

  useEffect(() => {
    if (status === "success" || (currentUser !== null && currentRole === "Admin")) {
      navigate("/Admin/dashboard")
    } else if (status === "failed") {
      setAlertMessage(response)
      setShowAlert(true)
      setLoading(false)
    } else if (status === "error") {
      setAlertMessage("Network Error")
      setShowAlert(true)
      setLoading(false)
    }
  }, [status, currentRole, navigate, error, response, currentUser])

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="auth-card border-0 shadow">
              <Row className="g-0">
                <Col md={6} className="d-none d-md-block">
                  <div className="auth-image h-100" style={{ backgroundImage: `url(${bgpic})` }}></div>
                </Col>
                <Col md={6}>
                  <div className="auth-form">
                    <div className="text-center mb-4">
                      <i className="bi bi-mortarboard-fill text-primary" style={{ fontSize: "2rem" }}></i>
                      <h2 className="auth-title">Admin Register</h2>
                      <p className="auth-subtitle">Create your own school by registering as an admin</p>
                    </div>

                    {showAlert && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                      </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="schoolName"
                          placeholder="Create your school name"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                          </Button>
                        </InputGroup>
                      </Form.Group>

                      <div className="d-grid mb-3">
                        <Button variant="primary" type="submit" size="lg" disabled={loading}>
                          {loading ? (
                            <>
                              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                              <span className="ms-2">Registering...</span>
                            </>
                          ) : (
                            "Register"
                          )}
                        </Button>
                      </div>

                      <div className="text-center mt-3">
                        <p>
                          Already have an account?{" "}
                          <Link to="/Adminlogin" className="text-primary fw-bold">
                            Log in
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminRegisterPage

