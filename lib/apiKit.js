const { default: httpClient } = require("./httpClient");

const APIKit = {
  auth: {
    login: (email, password) => {
      return httpClient.post("auth/login", { email, password });
    },

    register: (firstName, lastName, email, password, phone) => {
      return httpClient.post("auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
    },
  },
  users: {
    getAllUsers: (params) => {
      return httpClient.get("users");
    },
    getUserDetails: (uid) => {
      return httpClient.get(`users/${uid}`);
    },
    deleteUser: (uid) => {
      return httpClient.delete(`users/${uid}`);
    },
    addUser: (data) => {
      return httpClient.post("users", data);
    },
    updateUser: (uid, data) => {
      return httpClient.patch(`/users/${uid}`, data);
    },
  },
};

export default APIKit;
