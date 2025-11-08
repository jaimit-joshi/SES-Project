"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllNotices } from "../redux/noticeRelated/noticeHandle"
import { Spinner } from "react-bootstrap"

const SeeNotice = () => {
  const dispatch = useDispatch()
  const { currentUser, currentRole } = useSelector((state) => state.user)
  const { noticesList, loading, error, response } = useSelector((state) => state.notice)

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"))
    } else {
      dispatch(getAllNotices(currentUser.school._id, "Notice"))
    }
  }, [dispatch, currentUser, currentRole])

  if (error) {
    console.log(error)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (response) {
    return (
      <div className="text-center p-4">
        <p className="text-muted">No notices to show right now</p>
      </div>
    )
  }

  return (
    <div className="p-3">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {noticesList && noticesList.length > 0 ? (
            noticesList.map((notice) => {
              const date = new Date(notice.date)
              const dateString =
                date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"

              return (
                <tr key={notice._id}>
                  <td>{notice.title}</td>
                  <td>{notice.details}</td>
                  <td>{dateString}</td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No notices available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SeeNotice

