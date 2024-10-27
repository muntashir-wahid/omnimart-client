const { default: httpClient } = require("./httpClient");

const APIKit = {
  auth: {
    login: (email, password) => {
      return httpClient.post("/auth/login", { email, password });
    },

    register: (firstName, lastName, email, password, phone) => {
      return httpClient.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
    },
  },
};

export default APIKit;