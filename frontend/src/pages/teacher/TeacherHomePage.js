"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClassStudents, getSubjectDetails } from "../../redux/sclassRelated/sclassHandle"
import { Container, Row, Col } from "react-bootstrap"
import CountUp from "react-countup"
import SeeNotice from "../../components/SeeNotice"

const TeacherHomePage = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass)

  const classID = currentUser.teachSclass?._id
  const subjectID = currentUser.teachSubject?._id

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"))
    dispatch(getClassStudents(classID))
  }, [dispatch, subjectID, classID])

  const numberOfStudents = sclassStudents && sclassStudents.length
  const numberOfSessions = subjectDetails && subjectDetails.sessions

  return (
    <Container fluid>
      <Row className="g-4 mb-4">
        <Col md={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-people"></i>
            </div>
            <div className="card-title">Class Students</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfStudents || 0} duration={2.5} />
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-book"></i>
            </div>
            <div className="card-title">Total Lessons</div>
            <div className="card-value">
              <CountUp start={0} end={numberOfSessions || 0} duration={2.5} />
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

export default TeacherHomePage
