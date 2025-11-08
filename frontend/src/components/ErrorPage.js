"use client"
import styled from "styled-components"
import { Button, Typography, Container, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Home } from "@mui/icons-material"

const ErrorContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
    url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
`

const ErrorHeading = styled(Typography)`
  color: #fff;
  margin-bottom: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const ErrorText = styled(Typography)`
  color: #fff;
  margin-bottom: 32px;
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`

const HomeButton = styled(Button)`
  background-color: #7f56da;
  color: white;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(127, 86, 218, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #6a3dc8;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(127, 86, 218, 0.4);
  }
`

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <ErrorContainer maxWidth="md">
      <Box sx={{ py: 4 }}>
        <ErrorHeading variant="h2">Oops, something went wrong</ErrorHeading>
        <ErrorText variant="h6">
          We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please try
          again later or return to the homepage.
        </ErrorText>
        <HomeButton variant="contained" startIcon={<Home />} onClick={() => navigate("/")}>
          Return to Homepage
        </HomeButton>
      </Box>
    </ErrorContainer>
  )
}

export default ErrorPage

