"use client"
import { IconButton, Tooltip } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleDarkMode } from "../redux/userRelated/userSlice"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state) => state.user)

  const handleToggle = () => {
    dispatch(toggleDarkMode())
    localStorage.setItem("darkMode", JSON.stringify(!darkMode))
  }

  return (
    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
      <IconButton
        onClick={handleToggle}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          ml: 1,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(180deg)",
          },
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
