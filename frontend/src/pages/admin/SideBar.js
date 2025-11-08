import * as React from "react"
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, List } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

import HomeIcon from "@mui/icons-material/Home"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined"
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined"
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined"
import ReportIcon from "@mui/icons-material/Report"
import AssignmentIcon from "@mui/icons-material/Assignment"

const StyledListItemButton = styled(ListItemButton)`
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(127, 86, 218, 0.1);
  }
  
  &.active {
    background-color: rgba(127, 86, 218, 0.2);
  }
`

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 40px;
`

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-weight: 500;
  }
`

const StyledListSubheader = styled(ListSubheader)`
  font-weight: 600;
  color: #666;
  line-height: 2.5;
  background-color: transparent;
`

const StyledDivider = styled(Divider)`
  margin: 16px 0;
`

const SideBar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <List component="nav" sx={{ px: 2 }}>
      <React.Fragment>
        <StyledListItemButton
          component={Link}
          to="/"
          className={location.pathname === "/" || location.pathname === "/Admin/dashboard" ? "active" : ""}
        >
          <StyledListItemIcon>
            <HomeIcon color={isActive("/") || isActive("/Admin/dashboard") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Home" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/classes"
          className={isActive("/Admin/classes") ? "active" : ""}
        >
          <StyledListItemIcon>
            <ClassOutlinedIcon color={isActive("/Admin/classes") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Classes" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/subjects"
          className={isActive("/Admin/subjects") ? "active" : ""}
        >
          <StyledListItemIcon>
            <AssignmentIcon color={isActive("/Admin/subjects") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Subjects" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/teachers"
          className={isActive("/Admin/teachers") ? "active" : ""}
        >
          <StyledListItemIcon>
            <SupervisorAccountOutlinedIcon color={isActive("/Admin/teachers") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Teachers" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/students"
          className={isActive("/Admin/students") ? "active" : ""}
        >
          <StyledListItemIcon>
            <PersonOutlineIcon color={isActive("/Admin/students") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Students" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/notices"
          className={isActive("/Admin/notices") ? "active" : ""}
        >
          <StyledListItemIcon>
            <AnnouncementOutlinedIcon color={isActive("/Admin/notices") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Notices" />
        </StyledListItemButton>

        <StyledListItemButton
          component={Link}
          to="/Admin/complains"
          className={isActive("/Admin/complains") ? "active" : ""}
        >
          <StyledListItemIcon>
            <ReportIcon color={isActive("/Admin/complains") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Complains" />
        </StyledListItemButton>
      </React.Fragment>

      <StyledDivider />

      <React.Fragment>
        <StyledListSubheader component="div">User</StyledListSubheader>

        <StyledListItemButton
          component={Link}
          to="/Admin/profile"
          className={isActive("/Admin/profile") ? "active" : ""}
        >
          <StyledListItemIcon>
            <AccountCircleOutlinedIcon color={isActive("/Admin/profile") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Profile" />
        </StyledListItemButton>

        <StyledListItemButton component={Link} to="/logout" className={isActive("/logout") ? "active" : ""}>
          <StyledListItemIcon>
            <ExitToAppIcon color={isActive("/logout") ? "primary" : "inherit"} />
          </StyledListItemIcon>
          <StyledListItemText primary="Logout" />
        </StyledListItemButton>
      </React.Fragment>
    </List>
  )
}

export default SideBar

