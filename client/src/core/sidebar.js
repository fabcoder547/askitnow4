import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import $ from "jquery";
import { isAuthenticated, signout } from "../auth/helper/authHelper";

export default function Sidebar({ shouldDisplay }) {
  useEffect(() => {
    $(document).ready(function () {
      $("#dismiss, .overlay").on("click", function () {
        // hide sidebar
        $("#sidebar").removeClass("active");
        // hide overlay
        $(".overlay").removeClass("active");
      });

      $("#sidebarCollapse").on("click", function () {
        // open sidebar
        $("#sidebar").addClass("active");
        // fade in the overlay
        $(".overlay").addClass("active");
        // $(".collapse.in").toggleclassName("in");
        // $("a[aria-expanded=true]").attr("aria-expanded", "false");
      });
    });
  }, []);

  return (
    <div
      className="wrapper"
      style={{
        display: `${shouldDisplay ? "" : "none"}  `,
      }}
    >
      <nav id="sidebar">
        <div id="dismiss">
          <i className="fa fa-arrow-left"> </i>
        </div>
        <div class="sidebar-header">
          <h3>
            <i className="fa fa-question-circle"></i> askItNow
          </h3>
        </div>

        <ul class="list-unstyled components">
          <p>Dummy Heading</p>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fa fa-dashboard"></i> dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              <i className="fa fa-user"></i> profile
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
                <i class="fa fa-lock"></i> signout
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="overlay"></div>
    </div>
  );
}
