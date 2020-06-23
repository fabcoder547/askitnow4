import React from "react";
import "../css/footer.css";
export default function Footer({ shouldDisplay }) {
  return (
    <div
      style={{
        display: `${shouldDisplay ? "" : "none"}  `,
      }}
      className="row"
      id="footer"
    >
      <div className="col-md-12">
        <div>
          <button className="btn btn-lg btn-success">Contact Us</button>
        </div>
      </div>
    </div>
  );
}
