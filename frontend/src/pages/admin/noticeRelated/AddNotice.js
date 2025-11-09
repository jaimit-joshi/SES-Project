"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addStuff } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import { Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap"

const AddNotice = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, response, error } = useSelector((state) => state.user)
  const { currentUser } = useSelector((state) => state.user)

  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [date, setDate] = useState("")
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const fields = { title, details, date, adminID }
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(addStuff(fields, address))
  }

  useEffect(() => {
    if (status === "added") {
      setLoader(false)
      setAlertVariant("success")
      setAlertMessage("Notice created successfully")
      setShowAlert(true)
      setTimeout(() => {
        navigate("/Admin/notices")
        dispatch(underControl())
      }, 1500)
    } else if (status === "error") {
      setAlertMessage("Network Error")
      setAlertVariant("danger")
      setShowAlert(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch])

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="dashboard-card">
            <Card.Body className="p-4">
              <h3 className="text-center fw-bold mb-4">Create a Notice</h3>

              {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mb-4">
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notice title..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Enter notice details..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg" disabled={loader}>
                    {loader ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Creating...</span>
                      </>
                    ) : (
                      "Create Notice"
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

export default AddNotice
