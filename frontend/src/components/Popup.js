"use client"

import * as React from "react"
import { useDispatch } from "react-redux"
import { underControl } from "../redux/userRelated/userSlice"
import { underStudentControl } from "../redux/studentRelated/studentSlice"
import MuiAlert from "@mui/material/Alert"
import { Snackbar, styled } from "@mui/material"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiAlert-root": {
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  "& .MuiAlert-standardSuccess": {
    backgroundColor: "#43a047",
  },
  "& .MuiAlert-standardError": {
    backgroundColor: "#d32f2f",
  },
}))

const Popup = ({ message, setShowPopup, showPopup }) => {
  const dispatch = useDispatch()

  const vertical = "top"
  const horizontal = "right"

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setShowPopup(false)
    dispatch(underControl())
    dispatch(underStudentControl())
  }

  return (
    <>
      <StyledSnackbar
        open={showPopup}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        {message === "Done Successfully" ? (
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        )}
      </StyledSnackbar>
    </>
  )
}

export default Popup

