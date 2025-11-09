"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllNotices, markNoticeAsRead, unmarkNoticeAsRead } from "../redux/noticeRelated/noticeHandle"
import { Spinner, Form } from "react-bootstrap"

const SeeNotice = () => {
  const dispatch = useDispatch()
  const { currentUser, currentRole, darkMode } = useSelector((state) => state.user)
  const { noticesList, loading, error, response } = useSelector((state) => state.notice)
  const [updatingRead, setUpdatingRead] = useState({})

  useEffect(() => {
    console.log("[v0] Current role:", currentRole)
    console.log("[v0] Current user:", currentUser)

    if (currentRole === "Admin") {
      console.log("[v0] Fetching notices for admin with ID:", currentUser._id)
      dispatch(getAllNotices(currentUser._id, "Notice"))
    } else {
      console.log("[v0] Fetching notices for school with ID:", currentUser.school?._id)
      dispatch(getAllNotices(currentUser.school._id, "Notice"))
    }
  }, [dispatch, currentUser, currentRole])

  useEffect(() => {
    console.log("[v0] Notices state updated:", { noticesList, loading, error, response })
  }, [noticesList, loading, error, response])

  if (error) {
    console.log("[v0] Error fetching notices:", error)
  }

  const isNoticeRead = (notice) => {
    if (currentRole === "Admin") return false

    const userType = currentRole === "Student" ? "student" : "teacher"
    return notice.readBy?.some((read) => read.userId === currentUser._id && read.userType === userType)
  }

  const handleReadToggle = async (noticeId, isCurrentlyRead) => {
    if (currentRole === "Admin") return

    setUpdatingRead((prev) => ({ ...prev, [noticeId]: true }))
    const userType = currentRole === "Student" ? "student" : "teacher"

    try {
      if (isCurrentlyRead) {
        await dispatch(unmarkNoticeAsRead(noticeId, currentUser._id, userType))
      } else {
        await dispatch(markNoticeAsRead(noticeId, currentUser._id, userType))
      }
      if (currentRole === "Admin") {
        dispatch(getAllNotices(currentUser._id, "Notice"))
      } else {
        dispatch(getAllNotices(currentUser.school._id, "Notice"))
      }
    } catch (err) {
      console.error("Failed to update read status:", err)
    } finally {
      setUpdatingRead((prev) => ({ ...prev, [noticeId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (!noticesList || noticesList.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted">No notices to show right now</p>
      </div>
    )
  }

  const unreadNotices = []
  const readNotices = []

  if (noticesList && noticesList.length > 0) {
    noticesList.forEach((notice) => {
      if (isNoticeRead(notice)) {
        readNotices.push(notice)
      } else {
        unreadNotices.push(notice)
      }
    })
  }

  const renderNoticeTable = (notices, showReadCheckbox = true) => {
    if (notices.length === 0) {
      return <p className="text-center text-muted p-3">No notices in this section</p>
    }

    return (
      <table className="custom-table">
        <thead>
          <tr>
            {showReadCheckbox && currentRole !== "Admin" && <th style={{ width: "80px" }}>Mark as Read</th>}
            <th>Title</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => {
            const date = new Date(notice.date)
            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"
            const isRead = isNoticeRead(notice)

            return (
              <tr
                key={notice._id}
                style={{
                  backgroundColor: darkMode ? "#1a1a1a" : "#fff",
                }}
              >
                {showReadCheckbox && currentRole !== "Admin" && (
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={isRead}
                      onChange={() => handleReadToggle(notice._id, isRead)}
                      disabled={updatingRead[notice._id]}
                    />
                  </td>
                )}
                <td>{notice.title}</td>
                <td>{notice.details}</td>
                <td>{dateString}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="p-3">
      {currentRole === "Admin" ? (
        <>
          <h4 style={{ color: darkMode ? "#fff" : "#333", marginBottom: "20px" }}>All Notices</h4>
          {renderNoticeTable(noticesList, false)}
        </>
      ) : (
        <>
          <div style={{ marginBottom: "40px" }}>
            <h4 style={{ color: darkMode ? "#fff" : "#333", marginBottom: "15px" }}>Unread Notices</h4>
            {renderNoticeTable(unreadNotices, true)}
          </div>

          <div>
            <h4 style={{ color: darkMode ? "#fff" : "#333", marginBottom: "15px" }}>Read Notices</h4>
            {renderNoticeTable(readNotices, true)}
          </div>
        </>
      )}
    </div>
  )
}

export default SeeNotice
