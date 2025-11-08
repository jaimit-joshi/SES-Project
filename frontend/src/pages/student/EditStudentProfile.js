"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap"
import { updateUser } from "../../redux/userRelated/userHandle"

const EditStudentProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, response, error, loading } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    notificationPreferences: {
      email: true,
      sms: false,
    },
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("success")
  const [showAlert, setShowAlert] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [updateSubmitted, setUpdateSubmitted] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split("T")[0] : "",
        notificationPreferences: {
          email: currentUser.notificationPreferences?.email ?? true,
          sms: currentUser.notificationPreferences?.sms ?? false,
        },
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (updateSubmitted && !loading && !error) {
      setAlertMessage("Profile updated successfully!")
      setAlertType("success")
      setShowAlert(true)
      setUpdateSubmitted(false)
      setTimeout(() => {
        navigate("/Student/profile")
      }, 1000)
    }

    if (updateSubmitted && !loading && error) {
      setAlertMessage(error || "Failed to update profile. Please try again.")
      setAlertType("danger")
      setShowAlert(true)
      setUpdateSubmitted(false)
    }
  }, [loading, error, updateSubmitted, navigate])

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid"
    }

    if (showPasswordSection) {
      if (!passwordData.newPassword) {
        errors.newPassword = "New password is required"
      } else if (passwordData.newPassword.length < 6) {
        errors.newPassword = "Password must be at least 6 characters"
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      })
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      })
    }
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      notificationPreferences: {
        ...formData.notificationPreferences,
        [name]: checked,
      },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setAlertMessage("Please fix the validation errors")
      setAlertType("danger")
      setShowAlert(true)
      return
    }

    const updateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      notificationPreferences: formData.notificationPreferences,
    }

    if (showPasswordSection && passwordData.newPassword) {
      updateData.password = passwordData.newPassword
    }

    setUpdateSubmitted(true)
    setShowAlert(false)
    dispatch(updateUser(updateData, currentUser._id, "Student"))
  }

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="dashboard-card">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Edit Profile</h2>
                <Button variant="outline-secondary" onClick={() => navigate("/Student/profile")}>
                  <i className="bi bi-arrow-left me-2"></i>Back
                </Button>
              </div>

              {showAlert && (
                <Alert variant={alertType} dismissible onClose={() => setShowAlert(false)}>
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Card className="dashboard-card mb-4">
                  <Card.Body className="p-4">
                    <h5 className="card-title fw-bold mb-3">Personal Information</h5>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isInvalid={!!validationErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        isInvalid={!!validationErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        isInvalid={!!validationErrors.phone}
                      />
                      <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="dashboard-card mb-4">
                  <Card.Body className="p-4">
                    <h5 className="card-title fw-bold mb-3">Notification Preferences</h5>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Email Notifications"
                        name="email"
                        checked={formData.notificationPreferences.email}
                        onChange={handleNotificationChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="SMS Notifications"
                        name="sms"
                        checked={formData.notificationPreferences.sms}
                        onChange={handleNotificationChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="dashboard-card mb-4">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title fw-bold mb-0">Change Password</h5>
                      <Button
                        variant="link"
                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                        className="text-decoration-none"
                      >
                        {showPasswordSection ? "Cancel" : "Change Password"}
                      </Button>
                    </div>

                    {showPasswordSection && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                            isInvalid={!!validationErrors.newPassword}
                          />
                          <Form.Control.Feedback type="invalid">{validationErrors.newPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
                            isInvalid={!!validationErrors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    )}
                  </Card.Body>
                </Card>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary" onClick={() => navigate("/Student/profile")}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Saving...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EditStudentProfile
