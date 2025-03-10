import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../store/slices/userSlice";

export default function Navbar({ isLoginPage }) {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          BookShop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-white bg-primary rounded-pill shadow-sm"
                      : "text-dark"
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-white bg-primary rounded-pill shadow-sm"
                      : "text-dark"
                  }`
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
          {username ? (
            <>
              <div>{username}</div>
              <button
                className="btn btn-danger"
                onClick={(e) => handleLogOut(e)}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Log Out
                </NavLink>
              </button>
            </>
          ) : !isLoginPage ? (
            <button className="btn btn-primary">Login</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}
