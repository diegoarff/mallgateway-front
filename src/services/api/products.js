import api from "./axios";

export const getProducts = async (params) => {
  try {
    const response = await api.get("/products", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProductsFromFollowed = async (params) => {
  try {
    const response = await api.get("/products/followed", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("/products", product);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateProduct = async (productId, product) => {
  try {
    const response = await api.put(`/products/${productId}`, product);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getSimilarProducts = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/similar`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const followProduct = async (productId) => {
  try {
    const response = await api.post(`/products/${productId}/interest`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
