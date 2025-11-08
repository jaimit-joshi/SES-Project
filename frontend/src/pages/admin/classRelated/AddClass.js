"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addStuff } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import Popup from "../../../components/Popup"
import { CircularProgress, Box, Typography, TextField, Button, Card, CardContent, Grid } from "@mui/material"

const AddClass = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, response, error } = useSelector((state) => state.user)
  const { currentUser } = useSelector((state) => state.user)

  const [sclassName, setSclassName] = useState("")

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  const adminID = currentUser._id
  const fields = { sclassName, adminID }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(addStuff(fields, "Sclass"))
  }

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/classes")
      dispatch(underControl())
    } else if (status === "failed") {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    } else if (status === "error") {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch])

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Add New Class
          </Typography>

          <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Class Name"
                  variant="outlined"
                  value={sclassName}
                  onChange={(e) => setSclassName(e.target.value)}
                  placeholder="Enter class name"
                  required
                  helperText="Example: Class 10-A, Grade 12, etc."
                />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" type="submit" disabled={loader} sx={{ minWidth: 120 }}>
                  {loader ? <CircularProgress size={24} color="inherit" /> : "Add Class"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  )
}

export default AddClass
