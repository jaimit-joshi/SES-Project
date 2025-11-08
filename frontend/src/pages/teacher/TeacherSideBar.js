import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const TeacherSideBar = () => {
  const location = useLocation()
  const { currentUser } = useSelector((state) => state.user)
  const sclassName = currentUser.teachSclass

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" || location.pathname === "/Teacher/dashboard" ? "active fw-bold" : ""}`}
          >
            <i
              className={`bi bi-house-door me-2 ${isActive("/") || isActive("/Teacher/dashboard") ? "text-primary" : ""}`}
            ></i>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Teacher/class" className={`nav-link ${isActive("/Teacher/class") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-mortarboard me-2 ${isActive("/Teacher/class") ? "text-primary" : ""}`}></i>
            Class {sclassName?.sclassName}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Teacher/complain" className={`nav-link ${isActive("/Teacher/complain") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-exclamation-circle me-2 ${isActive("/Teacher/complain") ? "text-primary" : ""}`}></i>
            Complain
          </Link>
        </li>

        <li className="nav-item mt-3">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>User</span>
          </h6>
        </li>

        <li className="nav-item">
          <Link to="/Teacher/profile" className={`nav-link ${isActive("/Teacher/profile") ? "active fw-bold" : ""}`}>
            <i className={`bi bi-person me-2 ${isActive("/Teacher/profile") ? "text-primary" : ""}`}></i>
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

export default TeacherSideBar

