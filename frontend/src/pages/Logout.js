"use client"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authLogout } from "../redux/userRelated/userSlice"
import styled from "styled-components"
import { Box, Typography, Button, Paper, Avatar } from "@mui/material"
import { ExitToApp, Cancel } from "@mui/icons-material"

const LogoutContainer = styled(Paper)`
  max-width: 500px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  background-color: #fff;
`

const UserAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background-color: #7f56da;
  font-size: 32px;
  font-weight: 600;
`

const LogoutMessage = styled(Typography)`
  margin: 24px 0;
  font-size: 18px;
  color: #555;
`

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
`

const LogoutButton = styled(Button)`
  padding: 10px 24px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout())
    navigate("/")
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <LogoutContainer elevation={3}>
      <UserAvatar>{currentUser.name.charAt(0)}</UserAvatar>

      <Typography variant="h5" fontWeight={600} color="#333">
        {currentUser.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {currentUser.email || `Roll Number: ${currentUser.rollNum}`}
      </Typography>

      <LogoutMessage>Are you sure you want to log out?</LogoutMessage>

      <ButtonContainer>
        <LogoutButton variant="contained" color="error" onClick={handleLogout} startIcon={<ExitToApp />}>
          Log Out
        </LogoutButton>

        <LogoutButton variant="outlined" color="primary" onClick={handleCancel} startIcon={<Cancel />}>
          Cancel
        </LogoutButton>
      </ButtonContainer>
    </LogoutContainer>
  )
}

export default Logout

