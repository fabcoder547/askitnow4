import React, { useState } from "react";
import Base from "../core/Base";
import { signupUser } from "./helper/authHelper";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import ConfirmDetails from "./Confirm";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setformData] = useState(new FormData());
  const [photo, setPhoto] = useState(
    "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
  );

  const [userDetails, setuserDetails] = useState({
    step: 1,
    name: "",
    email: "",
    lastname: "",
    country: "",
    profilepic: "",
    password: "",
    birthdate: "",
    age: "",
    profession: "",
    success: false,
    error: false,
  });

  const {
    name,
    email,
    password,
    country,
    success,
    error,
    age,
    profession,
    profilepic,
    birthdate,
    lastname,
    step,
  } = userDetails;

  const nextStep = () => {
    setuserDetails({ ...userDetails, step: step + 1 });
  };

  const prevStep = () => {
    setuserDetails({ ...userDetails, step: step - 1 });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    signupUser(formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setuserDetails({
            ...userDetails,
            error: data.error,
            success: false,
            step: 4,
          });
        } else {
          setuserDetails({
            step: 1,
            name: "",
            lastname: "",
            profilepic: "",
            email: "",
            password: "",
            country: "",
            birthdate: "",
            error: false,
            success: true,
          });
          setformData(new FormData());
          setPhoto("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handelChange = (name) => (e) => {
    let value;
    if (name === "profilepic") {
      value = e.target.files[0];
      setPhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      value = e.target.value;
    }
    setuserDetails({ ...userDetails, [name]: value });
    formData.set(name, value);
  };

  const successMessaage = () => {
    if (success) {
      return (
        <div className="container text-center">
          <h6
            className="card-header bg-success"
            style={{ marginBottom: "10px", color: "white" }}
          >
            Signup Successfully!Please{" "}
            <Link className="text-white" to="/signin">
              signin
            </Link>{" "}
            here ..{" "}
          </h6>
        </div>
      );
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

  const signupHeader = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 authHeader">
            <h3>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fff" }}
              ></i>{" "}
              askItNow
            </h3>
            <p>Take your questions here!</p>
          </div>
        </div>
      </div>
    );
  };
  const signupForm = () => {
    switch (step) {
      case 1: {
        return (
          <Form1
            userDetails={userDetails}
            handelChange={handelChange}
            nextStep={nextStep}
          />
        );
      }
      case 2: {
        return (
          <Form2
            userDetails={userDetails}
            handelChange={handelChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      }
      case 3: {
        return (
          <Form3
            photo={photo}
            setPhoto={setPhoto}
            userDetails={userDetails}
            handelChange={handelChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      }
      case 4: {
        return (
          <ConfirmDetails
            userDetails={userDetails}
            photo={photo}
            onSubmit={onSubmit}
            prevStep={prevStep}
          />
        );
      }
    }
  };

  return (
    <div>
      <Base>
        {signupHeader()}
        {successMessaage()}
        {errorMessaage()}
        {signupForm()}
      </Base>
    </div>
  );
};
export default Signup;

{
  /* <div id="signupForm">
  <div className="row text-center my-4">
    <img
      src={photo}
      className="img-fluid  mx-auto rounded"
      width="120px"
      height="120px"
    />
  </div>
  <form>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <input
            onChange={handelChange("profilepic")}
            type="file"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handelChange("email")}
            type="email"
            placeholder="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handelChange("password")}
            type="password"
            placeholder="password"
            className="form-control"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <input
            value={name}
            onChange={handelChange("name")}
            type="text"
            placeholder="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            value={lastname}
            onChange={handelChange("lastname")}
            type="text"
            placeholder="Lastname"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            value={country}
            onChange={handelChange("country")}
            type="text"
            placeholder="Country"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            value={birthdate}
            onChange={handelChange("birthdate")}
            type="date"
            placeholder="birthdate"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-info" onClick={onSubmit}>
            Submit
                </button>
        </div>
      </div>
    </div>
  </form>
</div> */
}
