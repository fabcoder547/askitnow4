import { API } from "../../backend";

export const signupUser = (user) => {
  console.log(user);
  return fetch(`${API}/signup`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   type: "formData",
    // },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
      return {
        error: "Please fill details correctly!",
      };
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("token");
    next();
  }
};
