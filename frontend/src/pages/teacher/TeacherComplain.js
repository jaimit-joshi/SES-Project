"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserComplains } from "../../redux/complainRelated/complainHandle"
import { Row, Col, Form, Button, Card, Spinner, Alert, Badge } from "react-bootstrap"
import axios from "axios"

const REACT_APP_BASE_URL = "http://localhost:5001"

const TeacherComplain = () => {
  const [complaint, setComplaint] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { complainsList } = useSelector((state) => state.complain)

  useEffect(() => {
    dispatch(getUserComplains(currentUser._id))
  }, [dispatch, currentUser._id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const fields = {
        user: currentUser._id,
        userType: "teacher",
        date: new Date(),
        complaint,
        school: currentUser.school._id,
      }

      await axios.post(`${REACT_APP_BASE_URL}/ComplainCreate`, fields, {
        headers: { "Content-Type": "application/json" },
      })

      setAlertVariant("success")
      setAlertMessage("Complaint submitted successfully")
      setShowAlert(true)
      setComplaint("")
      dispatch(getUserComplains(currentUser._id))
    } catch (error) {
      setAlertVariant("danger")
      setAlertMessage("Failed to submit complaint")
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
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

          <Card className="dashboard-card mt-4">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-3">My Complaints</h4>
              {complainsList && complainsList.length > 0 ? (
                <div className="complaints-list">
                  {complainsList.map((comp) => {
                    const date = new Date(comp.date)
                    const dateString =
                      date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"
                    return (
                      <Card key={comp._id} className="mb-3 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <small className="text-muted">{dateString}</small>
                            <Badge bg={comp.status === "resolved" ? "success" : "warning"}>
                              {comp.status === "resolved" ? "Resolved" : "Pending"}
                            </Badge>
                          </div>
                          <p className="mb-0">{comp.complaint}</p>
                        </Card.Body>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted text-center">No complaints submitted yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TeacherComplain
