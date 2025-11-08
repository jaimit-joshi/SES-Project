"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { authLogout } from "../redux/userRelated/userSlice"

const DashboardLayout = ({ children, role }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const dropdownRef = useRef(null)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    dispatch(authLogout())
    navigate("/")
  }

  useEffect(() => {
    // Auto-collapse sidebar on small screens
    if (windowWidth < 992) {
      setSidebarCollapsed(true)
    } else {
      setSidebarCollapsed(false)
    }

    // Handle clicks outside dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    // Handle clicks outside sidebar on mobile
    const handleClickOutsideSidebar = (event) => {
      if (
        mobileSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".topbar-mobile-toggle")
      ) {
        setMobileSidebarOpen(false)
      }
    }

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 992) {
        setSidebarCollapsed(true)
      }

      // Close mobile sidebar when screen gets larger
      if (window.innerWidth >= 768 && mobileSidebarOpen) {
        setMobileSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("mousedown", handleClickOutsideSidebar)
    document.addEventListener("touchstart", handleClickOutsideSidebar)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("mousedown", handleClickOutsideSidebar)
      document.removeEventListener("touchstart", handleClickOutsideSidebar)
      window.removeEventListener("resize", handleResize)
    }
  }, [mobileSidebarOpen, windowWidth])

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location])

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  // Define menu items based on role
  const getMenuItems = () => {
    if (role === "Admin") {
      return [
        { path: "/Admin/dashboard", icon: "bi-house-door", text: "Home" },
        { path: "/Admin/classes", icon: "bi-mortarboard", text: "Classes" },
        { path: "/Admin/subjects", icon: "bi-book", text: "Subjects" },
        { path: "/Admin/teachers", icon: "bi-person-video3", text: "Teachers" },
        { path: "/Admin/students", icon: "bi-people", text: "Students" },
        { path: "/Admin/notices", icon: "bi-megaphone", text: "Notices" },
        { path: "/Admin/complains", icon: "bi-exclamation-circle", text: "Complains" },
      ]
    } else if (role === "Student") {
      return [
        { path: "/Student/dashboard", icon: "bi-house-door", text: "Home" },
        { path: "/Student/subjects", icon: "bi-book", text: "Subjects" },
        { path: "/Student/attendance", icon: "bi-calendar-check", text: "Attendance" },
        { path: "/Student/complain", icon: "bi-exclamation-circle", text: "Complain" },
      ]
    } else if (role === "Teacher") {
      return [
        { path: "/Teacher/dashboard", icon: "bi-house-door", text: "Home" },
        { path: "/Teacher/class", icon: "bi-mortarboard", text: "Class" },
        { path: "/Teacher/complain", icon: "bi-exclamation-circle", text: "Complain" },
      ]
    }
    return []
  }

  const menuItems = getMenuItems()

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileSidebarOpen ? "mobile-show" : ""}`}
      >
        <div className="sidebar-header">
          <Link to={`/${role}/dashboard`} className="sidebar-brand">
            <i className="bi bi-mortarboard-fill"></i>
          </Link>
          <button className="sidebar-toggle d-none d-md-block" onClick={toggleSidebar}>
            <i className={`bi ${sidebarCollapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
          </button>
          <button className="sidebar-close d-md-none" onClick={toggleMobileSidebar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-item">
              <Link to={item.path} className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}>
                <i className={`bi ${item.icon} sidebar-icon`}></i>
                <span className="sidebar-text">{item.text}</span>
              </Link>
            </li>
          ))}

          <div className="sidebar-divider"></div>
          <div className="sidebar-heading">User</div>

          <li className="sidebar-item">
            <Link to={`/${role}/profile`} className={`sidebar-link ${isActive(`/${role}/profile`) ? "active" : ""}`}>
              <i className="bi bi-person sidebar-icon"></i>
              <span className="sidebar-text">Profile</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="#" className="sidebar-link" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right sidebar-icon"></i>
              <span className="sidebar-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <div className="topbar">
          <button className="topbar-mobile-toggle" onClick={toggleMobileSidebar}>
            <i className="bi bi-list"></i>
          </button>

          <h1 className="topbar-title">{role} Dashboard</h1>

          <div className="user-dropdown" ref={dropdownRef}>
            <div className="user-dropdown-toggle" onClick={toggleDropdown}>
              <div className="user-avatar" style={{ backgroundColor: "#4361ee" }}>
                {currentUser?.name?.charAt(0)}
              </div>
              <span className="user-name d-none d-md-block">{currentUser?.name}</span>
              <i className={`bi ${dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"} d-none d-md-block`}></i>
            </div>

            <div className={`user-dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <Link to={`/${role}/profile`} className="user-dropdown-item">
                <i className="bi bi-person user-dropdown-icon"></i>
                Profile
              </Link>
              <div className="user-dropdown-divider"></div>
              <div className="user-dropdown-item" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right user-dropdown-icon"></i>
                Logout
              </div>
            </div>
          </div>
        </div>

        <div className="content-wrapper">{children}</div>
      </div>

      {/* Mobile overlay */}
      {mobileSidebarOpen && <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>}
    </div>
  )
}

export default DashboardLayout
