import React, { Fragment, useEffect } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/authHelper";
export default function Navbar({ shouldDisplay }) {
  return (
    <nav
      style={{
        display: `${shouldDisplay ? "" : "none"}  `,
      }}
      className="navbar navbar-expand-lg navbar-custom navbar-light "
    >
      <button type="button" id="sidebarCollapse" className="btn btn-info">
        <i className="fa fa-bars"></i>
      </button>
      <a className="navbar-brand ml-auto" href="#">
        <i className="fa fa-question-circle"></i> askItNow
      </a>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              profile
            </Link>
          </li>
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  signup
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  signin
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <Link
                to="/signin"
                onClick={() => {
                  signout(() => {
                    console.log("signout");
                  });
                }}
                className="nav-link"
              >
                signout
              </Link>
            </li>
          )}
        </ul>
      </div> */}
    </nav>
  );
}
