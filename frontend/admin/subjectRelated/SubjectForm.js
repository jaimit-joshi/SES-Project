"use client"

import { useEffect, useState } from "react"
import { Button, TextField, Grid, Box, Typography, CircularProgress, Card, CardContent, Divider } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addStuff } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import Popup from "../../../components/Popup"
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userState = useSelector((state) => state.user)
  const { status, currentUser, response, error } = userState

  const sclassName = params.id
  const adminID = currentUser._id
  const address = "Subject"

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  const handleSubjectNameChange = (index) => (event) => {
    const newSubjects = [...subjects]
    newSubjects[index].subName = event.target.value
    setSubjects(newSubjects)
  }

  const handleSubjectCodeChange = (index) => (event) => {
    const newSubjects = [...subjects]
    newSubjects[index].subCode = event.target.value
    setSubjects(newSubjects)
  }

  const handleSessionsChange = (index) => (event) => {
    const newSubjects = [...subjects]
    newSubjects[index].sessions = event.target.value || 0
    setSubjects(newSubjects)
  }

  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }])
  }

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects]
    newSubjects.splice(index, 1)
    setSubjects(newSubjects)
  }

  const fields = {
    sclassName,
    subjects: subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    })),
    adminID,
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(addStuff(fields, address))
  }

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects")
      dispatch(underControl())
      setLoader(false)
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
      <Card sx={{ maxWidth: 900, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Add Subjects
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
            {subjects.map((subject, index) => (
              <Box key={index} sx={{ mb: 4, p: 2, bgcolor: index % 2 === 0 ? "#f9f9f9" : "white", borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Subject Name"
                      variant="outlined"
                      value={subject.subName}
                      onChange={handleSubjectNameChange(index)}
                      required
                      sx={styles.inputField}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Subject Code"
                      variant="outlined"
                      value={subject.subCode}
                      onChange={handleSubjectCodeChange(index)}
                      required
                      sx={styles.inputField}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Sessions"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={subject.sessions}
                      onChange={handleSessionsChange(index)}
                      required
                      sx={styles.inputField}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {index === 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSubject}
                        startIcon={<AddIcon />}
                        fullWidth
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveSubject(index)}
                        startIcon={<DeleteIcon />}
                        fullWidth
                      >
                        Remove
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" color="primary" type="submit" disabled={loader} sx={{ minWidth: 120 }}>
                {loader ? <CircularProgress size={24} color="inherit" /> : "Save Subjects"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  )
}

export default SubjectForm

const styles = {
  inputField: {
    "& .MuiInputLabel-root": {
      color: "#838080",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#838080",
    },
  },
}
