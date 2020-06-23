import { API } from "../backend";

export const getProfle = (token, userId) => {
  return fetch(`${API}/profile/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const updateProfile = (token, userId, user) => {
  console.log(user);
  return fetch(`${API}/profile/update/${userId}`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    body: user,
  })
    .then((response) => {
      console.log(response);

      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
