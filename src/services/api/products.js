import api from "./axios";

export const getProducts = async (params) => {
  try {
    const response = await api.get("/products", { params });
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
