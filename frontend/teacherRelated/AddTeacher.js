"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle"
import Popup from "../../../components/Popup"
import { registerUser } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import { CircularProgress, Box, Typography, TextField, Button, Card, CardContent, Grid, Divider } from "@mui/material"

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector((state) => state.user)
  const { subjectDetails } = useSelector((state) => state.sclass)

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"))
  }, [dispatch, subjectID])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Add Teacher
          </Typography>

          <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Subject:</strong> {subjectDetails && subjectDetails.subName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Class:</strong>{" "}
              {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter teacher's name"
                  required
                  autoComplete="name"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter teacher's email"
                  required
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter teacher's password"
                  required
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" type="submit" disabled={loader} sx={{ minWidth: 120 }}>
                  {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
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

export default AddTeacher
