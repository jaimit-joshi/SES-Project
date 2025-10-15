"use client"

import { useState } from "react"
import { Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap"

const TeacherComplain = () => {
  const [complaint, setComplaint] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setAlertVariant("success")
      setAlertMessage("Complaint submitted successfully")
      setShowAlert(true)
      setComplaint("")
      setDate("")
    }, 1500)
  }

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="dashboard-card">
            <Card.Body className="p-4">
              <h3 className="text-center fw-bold mb-4">Submit a Complaint</h3>

              {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mb-4">
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Complaint</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Please describe your complaint in detail..."
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Submitting...</span>
                      </>
                    ) : (
                      "Submit Complaint"
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

export default TeacherComplain

