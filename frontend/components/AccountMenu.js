"use client"

import { useState } from "react"
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material"
import { Settings, Logout } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

const StyledAvatar = styled(Avatar)`
  background-color: #7f56da;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`

const StyledMenuItem = styled(MenuItem)`
  padding: 10px 16px;
  
  &:hover {
    background-color: rgba(127, 86, 218, 0.1);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
`

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { currentUser } = useSelector((state) => state.user)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <StyledAvatar sx={{ width: 36, height: 36 }}>{String(currentUser.name).charAt(0)}</StyledAvatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
            mt: 1.5,
            borderRadius: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 2,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem>
          <StyledLink to={`/${currentUser.role}/profile`}>
            <Avatar /> Profile
          </StyledLink>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </StyledMenuItem>
        <StyledMenuItem>
          <StyledLink to="/logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </StyledLink>
        </StyledMenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu

