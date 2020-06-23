import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/sidebar.css";
import Sidebar from "./sidebar";
import $ from "jquery";
const Base = ({ children, title, shouldDisplay = false }) => {
  useEffect(() => {
    if (shouldDisplay) {
      $("body").css({ "background-color": "#ffffff" });
    } else {
      $("body").css({ "background-color": "#0a859b" });
    }
  }, []);

  return (
    <div>
      <div className="row">
        <Navbar shouldDisplay={shouldDisplay} />
        <Sidebar shouldDisplay={shouldDisplay} />
      </div>
      <h3>{title}</h3>
      <div className="row">
        <div className="col-md-12">{children}</div>
      </div>
      <Footer shouldDisplay={shouldDisplay} />
    </div>
  );
};
export default Base;
