"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator"
import { getUserDetails } from "../../redux/userRelated/userHandle"
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle"
import { Container, Row, Col } from "react-bootstrap"
import CountUp from "react-countup"
import SeeNotice from "../../components/SeeNotice"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { Link } from "react-router-dom"

ChartJS.register(ArcElement, Tooltip, Legend)

const StudentHomePage = () => {
  const dispatch = useDispatch()
  const { userDetails, currentUser } = useSelector((state) => state.user)
  const { subjectsList } = useSelector((state) => state.sclass)
  const [subjectAttendance, setSubjectAttendance] = useState([])
  const [examResults, setExamResults] = useState([])

  const classID = currentUser.sclassName._id

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"))
    dispatch(getSubjectList(classID, "ClassSubjects"))
  }, [dispatch, currentUser._id, classID])

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || [])
      setExamResults(userDetails.examResult || [])
    }
  }, [userDetails])

  const numberOfSubjects = subjectsList && subjectsList.length
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance)
  const overallAbsentPercentage = 100 - overallAttendancePercentage

  // Calculate average marks
  const calculateAverageMarks = () => {
    if (!examResults || examResults.length === 0) return 0

    const totalMarks = examResults.reduce((sum, result) => {
      return sum + (result.marksObtained || 0)
    }, 0)

    return (totalMarks / examResults.length).toFixed(1)
  }

  const averageMarks = calculateAverageMarks()
  const hasMarks = examResults && examResults.length > 0

  const chartData = {
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }

  return (
    <Container fluid>
      <Row className="g-4 mb-4">
        <Col lg={4} sm={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-book"></i>
            </div>
            <div className="card-title">Total Subjects</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfSubjects || 0} duration={2.5} />
            </div>
          </div>
        </Col>

        <Col lg={4} sm={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-calendar-check"></i>
            </div>
            <div className="card-title">Attendance Overview</div>
            <div className="card-value">
              <CountUp start={0} end={overallAttendancePercentage || 0} duration={2.5} decimals={1} suffix="%" />
            </div>
            <Link to="/Student/attendance" className="text-primary d-block mt-2">
              View Details
            </Link>
          </div>
        </Col>

        <Col lg={4} sm={12}>
          <div className="dashboard-card">
            <div className="card-icon" style={{ backgroundColor: "rgba(255, 159, 64, 0.2)", color: "#ff9f40" }}>
              <i className="bi bi-award"></i>
            </div>
            <div className="card-title">Average Marks</div>
            <div className="card-value">
              {hasMarks ? (
                <CountUp start={0} end={Number.parseFloat(averageMarks)} duration={2.5} decimals={1} />
              ) : (
                "No marks yet"
              )}
            </div>
            <Link to="/Student/subjects" className="text-primary d-block mt-2">
              View Details
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={6} sm={12}>
          <div className="dashboard-card">
            <div className="card-title text-center mb-3">Attendance Overview</div>
            <div style={{ height: "200px" }}>
              {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                <Pie data={chartData} options={chartOptions} />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                  <p className="text-muted">No attendance data available</p>
                </div>
              )}
            </div>
          </div>
        </Col>

        <Col lg={6} sm={12}>
          <div className="dashboard-card">
            <div className="card-title text-center mb-3">Recent Marks</div>
            {examResults && examResults.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th className="text-end">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.slice(0, 3).map((result, index) => (
                      <tr key={index}>
                        <td>{result.subName?.subName || "Subject"}</td>
                        <td className="text-end">{result.marksObtained}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {examResults.length > 3 && (
                  <div className="text-center mt-2">
                    <Link to="/Student/subjects" className="text-primary">
                      View all marks
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
                <p className="text-muted">No marks data available</p>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="table-container">
            <div className="table-header">
              <h5 className="table-title">Notices</h5>
            </div>
            <SeeNotice />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default StudentHomePage
