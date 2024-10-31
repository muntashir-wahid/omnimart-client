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
  categories: {
    getAllCategories: (params) => {
      return httpClient.get("categories");
    },
    addCategory: (data) => {
      return httpClient.post("categories", data);
    },
    getCategoryDetails: (slug) => {
      return httpClient.get(`categories/${slug}`);
    },
    attributes: {
      getAllCategoryAttributes: (uid) => {
        return httpClient.get(`/categories/${uid}/attributes`);
      },
      addCategoryAttribute: (uid, data) => {
        return httpClient.post("attributes", data);
      },
      values: {
        addAttributeValue: (attributeUid, data) => {
          return httpClient.post(`attributes/${attributeUid}/values`, data);
        },
        getAttributeValues: (attributeUid) => {
          return httpClient.get(`attributes/${attributeUid}/values`);
        },
      },
    },
  },

  customers: {
    getAllCustomers: () => {
      return httpClient.get("customers");
    },
  },
};

export default APIKit;
