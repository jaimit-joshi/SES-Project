"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../redux/userRelated/userHandle"
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator"
import { Container, Row, Col, Card, Nav, Table, Button, Collapse, Spinner } from "react-bootstrap"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const ViewStdAttendance = () => {
  const dispatch = useDispatch()
  const { userDetails, currentUser, loading } = useSelector((state) => state.user)

  const [subjectAttendance, setSubjectAttendance] = useState([])
  const [activeTab, setActiveTab] = useState("table")
  const [openStates, setOpenStates] = useState({})

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"))
  }, [dispatch, currentUser._id])

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || [])
    }
  }, [userDetails])

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }))
  }

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance)
  const overallAbsentPercentage = 100 - overallAttendancePercentage

  const pieChartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [overallAttendancePercentage, overallAbsentPercentage],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Overall Attendance",
      },
    },
  }

  const barChartData = {
    labels: Object.keys(attendanceBySubject),
    datasets: [
      {
        label: "Attendance Percentage",
        data: Object.entries(attendanceBySubject).map(([_, { present, sessions }]) =>
          calculateSubjectAttendancePercentage(present, sessions),
        ),
        backgroundColor: "rgba(67, 97, 238, 0.6)",
        borderColor: "rgba(67, 97, 238, 1)",
        borderWidth: 1,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Attendance by Subject",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
  }

  const renderTableSection = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title className="mb-4">Attendance Details</Card.Title>
          <Table responsive className="custom-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Present</th>
                <th>Total Sessions</th>
                <th>Attendance Percentage</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions)

                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{subName}</td>
                      <td>{present}</td>
                      <td>{sessions}</td>
                      <td>{subjectAttendancePercentage}%</td>
                      <td className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleOpen(subId)}
                          aria-expanded={openStates[subId]}
                        >
                          {openStates[subId] ? "Hide Details" : "Show Details"}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="p-0">
                        <Collapse in={openStates[subId]}>
                          <div className="p-3">
                            <Table responsive size="sm" className="custom-table">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allData.map((data, idx) => {
                                  const date = new Date(data.date)
                                  const dateString =
                                    date.toString() !== "Invalid Date"
                                      ? date.toISOString().substring(0, 10)
                                      : "Invalid Date"
                                  return (
                                    <tr key={idx}>
                                      <td>{dateString}</td>
                                      <td>{data.status}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                )
              })}
              {Object.keys(attendanceBySubject).length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No attendance data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="mt-3">
            <strong>Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%</strong>
          </div>
        </Card.Body>
      </Card>
    )
  }

  const renderChartSection = () => {
    return (
      <Row className="g-4">
        <Col lg={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <Card.Title className="mb-4">Overall Attendance</Card.Title>
              <div style={{ height: "300px" }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <Card.Title className="mb-4">Attendance by Subject</Card.Title>
              <div style={{ height: "300px" }}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    <Container fluid>
      {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Nav variant="tabs" className="mb-3" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item>
                  <Nav.Link eventKey="table">Table View</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="chart">Chart View</Nav.Link>
                </Nav.Item>
              </Nav>

              {activeTab === "table" && renderTableSection()}
              {activeTab === "chart" && renderChartSection()}
            </Card.Body>
          </Card>
        </>
      ) : (
        <Card className="dashboard-card">
          <Card.Body className="text-center p-5">
            <Card.Title>No Attendance Data</Card.Title>
            <p className="text-muted">You don't have any attendance records yet.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default ViewStdAttendance

