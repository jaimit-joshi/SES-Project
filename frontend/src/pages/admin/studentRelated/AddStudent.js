"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../../redux/userRelated/userHandle"
import Popup from "../../../components/Popup"
import { underControl } from "../../../redux/userRelated/userSlice"
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle"
import {
  CircularProgress,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userState = useSelector((state) => state.user)
  const { status, currentUser, response, error } = userState
  const { sclassesList } = useSelector((state) => state.sclass)

  const [name, setName] = useState("")
  const [rollNum, setRollNum] = useState("")
  const [password, setPassword] = useState("")
  const [className, setClassName] = useState("")
  const [sclassName, setSclassName] = useState("")

  const adminID = currentUser._id
  const role = "Student"
  const attendance = []

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id)
    }
  }, [params.id, situation])

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"))
  }, [adminID, dispatch])

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class")
      setSclassName("")
    } else {
      const selectedClass = sclassesList.find((classItem) => classItem.sclassName === event.target.value)
      setClassName(selectedClass.sclassName)
      setSclassName(selectedClass._id)
    }
  }

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

  const submitHandler = (event) => {
    event.preventDefault()
    if (sclassName === "") {
      setMessage("Please select a classname")
      setShowPopup(true)
    } else {
      setLoader(true)
      dispatch(registerUser(fields, role))
    }
  }

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl())
      navigate(-1)
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
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
        <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
            >
              Add Student
            </Typography>

            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter student's name"
                    required
                    autoComplete="name"
                  />
                </Grid>

                {situation === "Student" && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="class-select-label">Class</InputLabel>
                      <Select labelId="class-select-label" value={className} label="Class" onChange={changeHandler}>
                        <MenuItem value="Select Class">Select Class</MenuItem>
                        {sclassesList.map((classItem, index) => (
                          <MenuItem key={index} value={classItem.sclassName}>
                            {classItem.sclassName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} md={situation === "Student" ? 6 : 6}>
                  <TextField
                    fullWidth
                    label="Roll Number"
                    variant="outlined"
                    type="number"
                    value={rollNum}
                    onChange={(e) => setRollNum(e.target.value)}
                    placeholder="Enter student's Roll Number"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={situation === "Student" ? 6 : 6}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter student's password"
                    required
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <Button variant="contained" color="primary" type="submit" disabled={loader} sx={{ minWidth: 120 }}>
                    {loader ? <CircularProgress size={24} color="inherit" /> : "Add Student"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default AddStudent
