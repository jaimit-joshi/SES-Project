"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle"
import {
  Paper,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  CircularProgress,
  Chip,
  Divider,
  Alert,
  Card,
  CardContent,
} from "@mui/material"
import { BlackButton, BlueButton } from "../../components/buttonStyles"
import TableTemplate from "../../components/TableTemplate"
import { KeyboardArrowDown, KeyboardArrowUp, School, Group, MenuBook } from "@mui/icons-material"

const TeacherClassDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const { currentUser } = useSelector((state) => state.user)
  const classID = currentUser.teachSclass?._id
  const subjectID = currentUser.teachSubject?._id
  const className = currentUser.teachSclass?.sclassName
  const subjectName = currentUser.teachSubject?.subName

  useEffect(() => {
    dispatch(getClassStudents(classID))
    // Set initial load to false after first data fetch
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [dispatch, classID])

  if (error) {
    console.log(error)
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      name: student.name,
      rollNum: student.rollNum,
      id: student._id,
    }
  })

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"]

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleClick = () => {
      console.info(`You clicked ${options[selectedIndex]}`)
      if (selectedIndex === 0) {
        handleAttendance()
      } else if (selectedIndex === 1) {
        handleMarks()
      }
    }

    const handleAttendance = () => {
      navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
    }
    const handleMarks = () => {
      navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
    }

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index)
      setOpen(false)
    }

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return
      }

      setOpen(false)
    }
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
          sx={{
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            padding: "6px 16px",
          }}
        >
          View
        </BlueButton>
        <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="action button group"
            sx={{
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Button
              onClick={handleClick}
              sx={{
                padding: "6px 16px",
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              {options[selectedIndex]}
            </Button>
            <BlackButton
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
              sx={{
                padding: "6px 8px",
                minWidth: "auto",
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </BlackButton>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
              width: 200,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          sx={{
                            padding: "10px 16px",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "#e3f2fd",
                              "&:hover": {
                                backgroundColor: "#bbdefb",
                              },
                            },
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      </Box>
    )
  }

  return (
    <div className="container-fluid py-4">
      <Card className="mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <School sx={{ color: "primary.main", mr: 1, fontSize: 28 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Class Details
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <Chip
              icon={<Group />}
              label={`Class: ${className}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: "medium", px: 1 }}
            />
            <Chip
              icon={<MenuBook />}
              label={`Subject: ${subjectName}`}
              color="secondary"
              variant="outlined"
              sx={{ fontWeight: "medium", px: 1 }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {isInitialLoad || loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {getresponse || sclassStudents.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No students found in this class. Students will appear here once they are added to this class.
                </Alert>
              ) : (
                <Paper
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ p: 3, pb: 1 }}>
                    <Typography variant="h5" fontWeight="600" color="primary">
                      Students List
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Total students: {sclassStudents.length}
                    </Typography>
                  </Box>

                  {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                  )}
                </Paper>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TeacherClassDetails
