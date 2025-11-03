"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Form, Button, InputGroup, Spinner, Card } from "react-bootstrap"
import { loginUser } from "../redux/userRelated/userHandle"
import bgpic from "../assets/designlogin.jpg"

const LoginPage = ({ role }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector((state) => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rollNum: "",
    studentName: "",
  })
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

    if (role === "Student") {
      const { rollNum, studentName, password } = formData
      if (!rollNum || !studentName || !password) {
        setAlertMessage("Please fill all required fields")
        setShowAlert(true)
        setLoading(false)
        return
      }
      dispatch(loginUser({ rollNum, studentName, password }, role))
    } else {
      const { email, password } = formData
      if (!email || !password) {
        setAlertMessage("Please fill all required fields")
        setShowAlert(true)
        setLoading(false)
        return
      }
      dispatch(loginUser({ email, password }, role))
    }
  }

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard")
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard")
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard")
      }
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
                      <h2 className="auth-title">{role} Login</h2>
                      <p className="auth-subtitle">Welcome back! Please enter your details</p>
                    </div>

                    {showAlert && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                      </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                      {role === "Student" ? (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control
                              type="number"
                              name="rollNum"
                              placeholder="Enter your roll number"
                              value={formData.rollNum}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="studentName"
                              placeholder="Enter your name"
                              value={formData.studentName}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </>
                      ) : (
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
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputGroup>
                      </Form.Group>

                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                      </Button>
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

export default LoginPage
