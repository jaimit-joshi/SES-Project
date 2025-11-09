"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Paper, Box, Select, MenuItem, FormControl } from "@mui/material"
import { getAllComplains, updateComplainStatus } from "../../../redux/complainRelated/complainHandle"
import TableTemplate from "../../../components/TableTemplate"

const SeeComplains = () => {
  const dispatch = useDispatch()
  const { complainsList, loading, error, response } = useSelector((state) => state.complain)
  const { currentUser } = useSelector((state) => state.user)
  const [updatingStatus, setUpdatingStatus] = useState({})

  useEffect(() => {
    console.log("[v0] Fetching complaints for school:", currentUser._id)
    dispatch(getAllComplains(currentUser._id, "Complain"))
  }, [currentUser._id, dispatch])

  if (error) {
    console.log("[v0] Error loading complaints:", error)
  }

  console.log("[v0] Complaints list:", complainsList)
  console.log("[v0] Loading:", loading)
  console.log("[v0] Response:", response)

  const handleStatusChange = async (complainId, newStatus) => {
    setUpdatingStatus((prev) => ({ ...prev, [complainId]: true }))
    try {
      await dispatch(updateComplainStatus(complainId, newStatus))
      // Refresh the complaints list
      dispatch(getAllComplains(currentUser._id, "Complain"))
    } catch (err) {
      console.error("Failed to update status:", err)
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [complainId]: false }))
    }
  }

  const complainColumns = [
    { id: "user", label: "User", minWidth: 170 },
    { id: "complaint", label: "Complaint", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 120 },
  ]

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      console.log("[v0] Processing complaint:", complain)
      const date = new Date(complain.date)
      const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"
      return {
        user: complain.user ? complain.user.name : "Unknown User",
        complaint: complain.complaint,
        date: dateString,
        status: complain.status || "pending",
        id: complain._id,
      }
    })

  const ComplainButtonHaver = ({ row }) => {
    return (
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          disabled={updatingStatus[row.id]}
          sx={{
            backgroundColor: row.status === "resolved" ? "#e8f5e9" : "#fff3e0",
            "& .MuiSelect-select": {
              padding: "8px 12px",
            },
          }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>No Complains Right Now</Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  )
}

export default SeeComplains
