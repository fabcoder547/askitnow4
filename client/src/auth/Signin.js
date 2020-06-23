import React, { useState } from "react";
import Base from "../core/Base";
import { signin, authenticate } from "./helper/authHelper";
import { Redirect, Link } from "react-router-dom";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    password: "12345",
    email: "atharvjoshi547@gmail.com",
    error: false,
    success: false,
  });

  const { password, email, success, error } = credentials;

  const onSubmit = (e) => {
    e.preventDefault();
    signin({ email, password })
      .then((data) => {
        if (data.error && data.msg) {
          setCredentials({ ...credentials, error: data.error, success: false });
        } else if (data.error) {
          setCredentials({
            ...credentials,
            error: "Couldn't signin! Please try again",
            success: false,
          });
        } else {
          console.log(data);
          authenticate(data, () => {
            setCredentials({
              ...credentials,
              email: "",
              password: "",
              success: true,
              error: false,
            });
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handelChange = (name) => (e) => {
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const successMessaage = () => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const errorMessaage = () => {
    if (error) {
      return (
        <div className="container text-center">
          <h6
            className="card-header text-white bg-danger"
            style={{ marginBottom: "10px", color: "white" }}
          >
            {error}
          </h6>
        </div>
      );
    }
  };

  const signinForm = () => {
    return (
      <div className="container">
        <div className="col-md-6 mx-auto signinForm">
          <div className="header bg-primary text-center">
            <h3>Signin</h3>
          </div>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                className="form-control"
                onChange={handelChange("email")}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={handelChange("password")}
              />
            </div>
            <div className="form-group text-center">
              <button
                onClick={onSubmit}
                className="btn btn-lg btn-success signinbtn"
              >
                Signin
              </button>
              <p>
                Dont't have an account?<Link to="/signup">Register</Link> here
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base>
        <div className="container">
          <div className="row ">
            <div className="col-md-12  signinheader">
              <h3>
                <i class="fa fa-question-circle"></i> askItNow
              </h3>
              <h4>Welcome Back</h4>
              <p>Dont' ignore your questions,Ask them here!</p>
            </div>
          </div>
        </div>
        {successMessaage()}
        {errorMessaage()}
        {signinForm()}
      </Base>
    </div>
  );
};
export default Signin;
