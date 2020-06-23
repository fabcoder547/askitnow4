import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/authHelper";
import { getProfle, updateProfile } from "./helper";

export default function Profilepage() {
  const [photo, setPhoto] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormdata] = useState(new FormData());
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    photoData: "",
    photoType: "",
    birthdate: "",
    profilepic: "",
    profession: "",
    likes: "",
    age: "",
    country: "",
    error: "",
    sucess: false,
    reload: false,
    loading: true,
  });

  const {
    likes,
    name,
    lastname,
    email,
    birthdate,
    age,
    profilepic,
    profession,
    photoData,
    photoType,
    error,
    sucess,
    loading,
    country,
    reload,
  } = values;
  const { user, token } = isAuthenticated();

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const preload = () => {
    getProfle(token, user._id)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({
            ...values,
            error: "failed to load profile",
            sucess: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            likes: data.user.likes,
            name: data.user.name,
            lastname: data.user.lastname,
            email: data.user.email,
            birthdate: data.user.birthdate,
            age: data.user.age,
            profession: data.user.profession,
            country: data.user.country,
          });
          var base64Flag = `data:${data.user.profilepic.ContentType};base64,`;
          var imageStr = arrayBufferToBase64(data.user.profilepic.data.data);
          setPhoto(base64Flag + imageStr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
    setFormdata(new FormData());
  }, [reload]);

  const changelikes = (e) => {
    e.preventDefault();
    console.log(isLiked);
    setIsLiked(!isLiked);
    console.log(isLiked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(token, user._id, formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({
            ...values,
            error: "Server not responding",
            sucess: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            sucess: true,
            error: false,
            loading: false,
            reload: !reload,
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: "Server not responding" });
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
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const profilepage = () => {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-12 coinfirmpage" style={{ marginTop: "50px" }}>
            <div className="row text-center  my-4">
              <div className="col-md-12">
                <img
                  src={photo}
                  className="img-fluid  mx-auto rounded"
                  width="120px"
                  height="120px"
                />
              </div>
              <div className="col-md-12 ">
                <h6
                  value={likes}
                  onClick={changelikes}
                  style={{
                    margin: "5px",
                    fontSize: "20px",
                    color: isLiked ? "red" : "green",
                  }}
                >
                  <i class="fa fa-thumbs-up"></i>
                  <h6>{likes}</h6>
                </h6>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="file"
                      onChange={handelChange("profilepic")}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handelChange("email")}
                      value={email}
                      type="email"
                      placeholder="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handelChange("profession")}
                      value={profession}
                      type="text"
                      placeholder="profession"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handelChange("birthdate")}
                      value={birthdate}
                      type="date"
                      placeholder="birthdate"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      onChange={handelChange("name")}
                      value={name}
                      type="text"
                      placeholder="name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handelChange("lastname")}
                      value={lastname}
                      type="text"
                      placeholder="Lastname"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handelChange("country")}
                      value={country}
                      type="text"
                      placeholder="Country"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      onChange={handelChange("age")}
                      value={age}
                      type="number"
                      placeholder="Age"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button className="btn btn-success backbtn">prev</button>

                  <button
                    onClick={onSubmit}
                    style={{ float: "right" }}
                    className="btn btn-success signupbtn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Base title="I am private" shouldDisplay={true}>
        {profilepage()}
      </Base>
    </div>
  );
}
