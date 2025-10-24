"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle"
import { getUserDetails } from "../../redux/userRelated/userHandle"
import { Container, Row, Col, Card, Nav, Table, Spinner, Alert } from "react-bootstrap"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import CustomBarChart from "../../components/CustomBarChart"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
    }
  }, [userDetails])

  useEffect(() => {
    if (subjectMarks.length === 0) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"))
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id])

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

  const chartData = {
    labels: subjectMarks.map((result) => result.subName?.subName || "Unknown"),
    datasets: [
      {
        label: "Marks Obtained",
        data: subjectMarks.map((result) => result.marksObtained),
        backgroundColor: "rgba(67, 97, 238, 0.6)",
        borderColor: "rgba(67, 97, 238, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "Subject Marks",
        font: {
          size: isMobile ? 14 : 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Marks: ${context.raw}`,
        },
        titleFont: {
          size: isMobile ? 12 : 14,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Marks",
          font: {
            size: isMobile ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Subjects",
          font: {
            size: isMobile ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
          },
          maxRotation: 90,
          minRotation: 45,
        },
      },
    },
  }

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
                    if (!result.subName) {
                      return null
                    }

                    // Find the subject details from subjectsList
                    const subjectDetails = subjectsList.find((subject) => subject._id === result.subName._id)

                    // Determine status based on marks
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
                        <td>{result.subName.subName}</td>
                        <td>{subjectDetails?.subCode || "N/A"}</td>
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
              <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
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
            <strong>Class:</strong> {currentUser.sclassName.sclassName}
          </p>
          <p className="mb-4">
            <strong>Subjects:</strong>
          </p>
          <ul className="list-group">
            {subjectsList && subjectsList.length > 0 ? (
              subjectsList.map((subject, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {subject.subName}
                  <span className="badge bg-primary rounded-pill">{subject.subCode}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">No subjects available</li>
            )}
          </ul>
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
                here. In the meantime, you can view your class details below.
              </p>
            </Alert>
            {renderClassDetailsSection()}
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default StudentSubjects
