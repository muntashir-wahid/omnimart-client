import httpClient from "./httpClient";

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
      return httpClient.get("users", { params });
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
      return httpClient.patch(`users/${uid}`, data);
    },

    getMe: () => {
      return httpClient.get("users/me");
    },

    addresses: {
      addAddress: (data) => {
        return httpClient.post("addresses", data);
      },

      getAllAddresses: () => {
        return httpClient.get("addresses");
      },
    },
  },

  geoLocationsBD: {
    getAllDivisions: (params) => {
      return httpClient.get("divisions");
    },

    getAllDistrictsOnDivision: (divisionUid) => {
      return httpClient.get(`divisions/${divisionUid}/districts`);
    },

    getAllAreasOnDistrict: (districtUid) => {
      return httpClient.get(`districts/${districtUid}/regions`);
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
    getAllCustomers: (params) => {
      return httpClient.get("customers", { params });
    },
  },

  inventory: {
    addInventory: (data) => {
      return httpClient.post("inventory", data);
    },
    getAllInventory: (params) => {
      return httpClient.get("inventory", { params });
    },
    getInventory: (inventorySlug) => {
      return httpClient.get(`inventory/${inventorySlug}`);
    },
    stock: {
      addInventoryStock: (inventoryUid, data) => {
        return httpClient.post(`inventory/${inventoryUid}/stocks`, data);
      },
      getInventoryAllStocks: (inventoryUid, params) => {
        return httpClient.get(`inventory/${inventoryUid}/stocks`, { params });
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
    getProductDetails: (productSlug, params) => {
      return httpClient.get(`products/${productSlug}`, { params });
    },
    getRelatedProductList: (productSlug, currentProductUid) => {
      return httpClient.get(
        `products/${productSlug}?item[not]=${currentProductUid}`
      );
    },
  },

  cart: {
    addProductToCart: (data) => {
      return httpClient.post("cart", data);
    },
    getCart: () => {
      return httpClient.get("cart");
    },
  },

  orders: {
    placeOrder: (data) => {
      return httpClient.post("orders", data);
    },

    getAllOrders: (params) => {
      return httpClient.get("orders", { params });
    },

    getOrder: (orderUid) => {
      return httpClient.get(`orders/${orderUid}`);
    },
  },
};

export default APIKit;
