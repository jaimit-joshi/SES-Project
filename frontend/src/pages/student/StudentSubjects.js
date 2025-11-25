"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle"
import { getUserDetails } from "../../redux/userRelated/userHandle"
import { Container, Row, Col, Card, Nav, Table, Spinner, Alert } from "react-bootstrap"
import CustomBarChart from "../../components/CustomBarChart"

const StudentSubjects = () => {
  const dispatch = useDispatch()
  const { subjectsList, loading: sclassLoading } = useSelector((state) => state.sclass)
  const { userDetails, currentUser, loading: userLoading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"))
  }, [dispatch, currentUser._id])

  const [subjectMarks, setSubjectMarks] = useState([])
  const [activeTab, setActiveTab] = useState("table")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || [])

      console.log("[v0] SUBJECTS PAGE - userDetails:", userDetails)
      console.log("[v0] SUBJECTS PAGE - examResult:", userDetails.examResult)
      if (userDetails.examResult && userDetails.examResult.length > 0) {
        console.log("[v0] SUBJECTS PAGE - First result:", userDetails.examResult[0])
        console.log("[v0] SUBJECTS PAGE - First result.subName:", userDetails.examResult[0].subName)
        if (typeof userDetails.examResult[0].subName === "object") {
          console.log("[v0] SUBJECTS PAGE - subName object keys:", Object.keys(userDetails.examResult[0].subName))
        }
      }
    }
  }, [userDetails])

  const classID = typeof currentUser.sclassName === "object" ? currentUser.sclassName._id : currentUser.sclassName

  const className = typeof currentUser.sclassName === "object" ? currentUser.sclassName.sclassName : "Your Class"

  useEffect(() => {
    if (classID) {
      dispatch(getSubjectList(classID, "ClassSubjects"))
    }
  }, [dispatch, classID])

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = windowWidth <= 428

  const getSubjectDetailsFromResult = (result, index) => {
    let subjectName = "Unknown Subject"
    let subjectCode = "N/A"

    // If subName exists as an object with the name
    if (result.subName && typeof result.subName === "object") {
      subjectName = result.subName.subName || result.subName.name || "Unknown Subject"
      subjectCode = result.subName.subCode || result.subName.code || "N/A"
    }
    // If subName exists as a string ID, try to match it
    else if (result.subName && typeof result.subName === "string") {
      const matchedSubject = subjectsList?.find((subject) => subject._id === result.subName)
      if (matchedSubject) {
        subjectName = matchedSubject.subName
        subjectCode = matchedSubject.subCode
      }
    }
    // Fallback: match by index if subjectsList exists and has enough subjects
    else if (subjectsList && subjectsList.length > index) {
      subjectName = subjectsList[index].subName
      subjectCode = subjectsList[index].subCode
    }

    return { subjectName, subjectCode }
  }

  const chartData = subjectMarks.map((result, index) => {
    const { subjectName } = getSubjectDetailsFromResult(result, index)

    return {
      subName: subjectName,
      marksObtained: result.marksObtained || 0,
    }
  })

  const renderTableSection = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title className="mb-4">Subject Marks</Card.Title>
          <div className="table-responsive">
            <Table className="custom-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Subject Code</th>
                  <th className="text-center">Marks</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjectMarks.length > 0 ? (
                  subjectMarks.map((result, index) => {
                    const { subjectName, subjectCode } = getSubjectDetailsFromResult(result, index)

                    let status = "Pending"
                    let statusClass = "text-warning"

                    if (result.marksObtained !== undefined) {
                      if (result.marksObtained >= 60) {
                        status = "Passed"
                        statusClass = "text-success"
                      } else if (result.marksObtained >= 0) {
                        status = "Failed"
                        statusClass = "text-danger"
                      }
                    }

                    return (
                      <tr key={index}>
                        <td>{subjectName}</td>
                        <td>{subjectCode}</td>
                        <td className="text-center">
                          {result.marksObtained !== undefined ? result.marksObtained : "Not graded"}
                        </td>
                        <td className={`text-center ${statusClass}`}>{status}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No marks data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {subjectMarks.length > 0 && (
            <div className="mt-4 p-3 bg-light rounded">
              <h5 className={isMobile ? "fs-6" : ""}>Summary</h5>
              <div className="d-flex flex-wrap justify-content-between">
                <div className="me-4 mb-3">
                  <strong>Total Subjects:</strong> {subjectMarks.length}
                </div>
                <div className="me-4 mb-3">
                  <strong>Average Marks:</strong>{" "}
                  {(
                    subjectMarks.reduce((sum, subject) => sum + (subject.marksObtained || 0), 0) / subjectMarks.length
                  ).toFixed(2)}
                </div>
                <div className="mb-3">
                  <strong>Highest Mark:</strong>{" "}
                  {Math.max(...subjectMarks.map((subject) => subject.marksObtained || 0))}
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    )
  }

  const renderChartSection = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title className="mb-4">Subject Marks Chart</Card.Title>
          {subjectMarks.length > 0 ? (
            <div style={{ height: isMobile ? "300px" : "400px", width: "100%" }}>
              <CustomBarChart chartData={chartData} dataKey="marksObtained" />
            </div>
          ) : (
            <div className="text-center p-5">
              <p className="text-muted">No marks data available to display chart</p>
            </div>
          )}
        </Card.Body>
      </Card>
    )
  }

  const renderClassDetailsSection = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title className="mb-4">Class Details</Card.Title>
          <p className="mb-3">
            <strong>Class:</strong> {className}
          </p>
          <p className="mb-4">
            <strong>Subjects:</strong>
          </p>
          <div className="row g-3">
            {subjectsList && subjectsList.length > 0 ? (
              subjectsList.map((subject, index) => (
                <div key={index} className="col-md-6">
                  <div className="card h-100 border-start border-primary border-4">
                    <div className="card-body">
                      <h6 className="card-title fw-bold mb-2">{subject.subName}</h6>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-primary">{subject.subCode}</span>
                        <span className="text-muted small">
                          <i className="bi bi-calendar-event me-1"></i>
                          {subject.sessions} sessions
                        </span>
                      </div>
                      {subject.teacher && (
                        <div className="text-muted small">
                          <i className="bi bi-person me-1"></i>
                          Teacher: {subject.teacher.name || "Assigned"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  No subjects have been added to your class yet. Please contact your administrator.
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    )
  }

  if (userLoading || sclassLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h3 className={`page-title ${isMobile ? "fs-4" : ""}`}>Academic Performance</h3>
          <p className={`text-muted ${isMobile ? "small" : ""}`}>View your marks and academic progress</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>{renderClassDetailsSection()}</Col>
      </Row>

      {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Nav variant="tabs" className="mb-3" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item>
                  <Nav.Link eventKey="table" className={isMobile ? "py-1 px-2" : ""}>
                    Table View
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="chart" className={isMobile ? "py-1 px-2" : ""}>
                    Chart View
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              {activeTab === "table" && renderTableSection()}
              {activeTab === "chart" && renderChartSection()}
            </Card.Body>
          </Card>
        </>
      ) : (
        <Row>
          <Col>
            <Alert variant="info">
              <Alert.Heading className={isMobile ? "fs-5" : ""}>No Marks Available Yet</Alert.Heading>
              <p className={isMobile ? "small" : ""}>
                Your exam results haven't been uploaded yet. Once your teachers grade your exams, your marks will appear
                here.
              </p>
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default StudentSubjects
