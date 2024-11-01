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

  inventory: {
    addInventory: (data) => {
      return httpClient.post("inventory", data);
    },
    getAllInventory: () => {
      return httpClient.get("inventory");
    },
    getInventory: (inventorySlug) => {
      return httpClient.get(`inventory/${inventorySlug}`);
    },
    stock: {
      addInventoryStock: (inventoryUid, data) => {
        return httpClient.post(`inventory/${inventoryUid}/stocks`, data);
      },
      getInventoryAllStocks: (inventoryUid) => {
        return httpClient.get(`inventory/${inventoryUid}/stocks`);
      },
      updateInventoryStock: (inventoryUid, sku, data) => {
        return httpClient.patch(
          `inventory/${inventoryUid}/stocks/${sku}`,
          data
        );
      },
    },
  },

  products: {
    getAllProducts: (params) => {
      return httpClient.get("products", { params });
    },
    getProductDetails: (productSlug) => {
      return httpClient.get(`products/${productSlug}`);
    },
    getRelatedProductList: (productSlug, currentProductUid) => {
      return httpClient.get(
        `products/${productSlug}?item[not]=${currentProductUid}`
      );
    },
  },
};

export default APIKit;
