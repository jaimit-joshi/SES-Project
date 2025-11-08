import { Link, useLocation } from "react-router-dom"

const StudentSideBar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" || location.pathname === "/Student/dashboard" ? "active fw-bold" : ""}`}
          >
            <i
              className={`bi bi-house-door me-2 ${isActive("/") || isActive("/Student/dashboard") ? "text-primary" : ""}`}
            ></i>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Student/subjects" className={`nav-link ${isActive("/Student/subjects") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-book me-2 ${isActive("/Student/subjects") ? "text-primary" : ""}`}></i>
            Subjects
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/Student/attendance"
            className={`nav-link ${isActive("/Student/attendance") ? "active fw-bold" : ""}`}
          >
            <i className={`bi bi-calendar-check me-2 ${isActive("/Student/attendance") ? "text-primary" : ""}`}></i>
            Attendance
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Student/complain" className={`nav-link ${isActive("/Student/complain") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-exclamation-circle me-2 ${isActive("/Student/complain") ? "text-primary" : ""}`}></i>
            Complain
          </Link>
        </li>

        <li className="nav-item mt-3">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>User</span>
          </h6>
        </li>

        <li className="nav-item">
          <Link to="/Student/profile" className={`nav-link ${isActive("/Student/profile") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-person me-2 ${isActive("/Student/profile") ? "text-primary" : ""}`}></i>
            Profile
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/logout" className={`nav-link ${isActive("/logout") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-box-arrow-right me-2 ${isActive("/logout") ? "text-primary" : ""}`}></i>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default StudentSideBar

