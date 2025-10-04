"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle"
import { getAllStudents } from "../../redux/studentRelated/studentHandle"
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle"
import { Container, Row, Col } from "react-bootstrap"
import CountUp from "react-countup"
import SeeNotice from "../../components/SeeNotice"

const AdminHomePage = () => {
  const dispatch = useDispatch()
  const { studentsList } = useSelector((state) => state.student)
  const { sclassesList } = useSelector((state) => state.sclass)
  const { teachersList } = useSelector((state) => state.teacher)
  const { currentUser } = useSelector((state) => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllStudents(adminID))
    dispatch(getAllSclasses(adminID, "Sclass"))
    dispatch(getAllTeachers(adminID))
  }, [adminID, dispatch])

  const numberOfStudents = studentsList && studentsList.length
  const numberOfClasses = sclassesList && sclassesList.length
  const numberOfTeachers = teachersList && teachersList.length

  return (
    <Container fluid>
      <Row className="g-4 mb-4">
        <Col lg={4} sm={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-people"></i>
            </div>
            <div className="card-title">Total Students</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfStudents || 0} duration={2.5} />
            </div>
          </div>
        </Col>

        <Col lg={4} sm={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-mortarboard"></i>
            </div>
            <div className="card-title">Total Classes</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfClasses || 0} duration={2.5} />
            </div>
          </div>
        </Col>

        <Col lg={4} sm={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-person-video3"></i>
            </div>
            <div className="card-title">Total Teachers</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfTeachers || 0} duration={2.5} />
            </div>
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

export default AdminHomePage
