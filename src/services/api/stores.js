import { useGlobalStore } from "../../stores/global";
import api from "./axios";

export const getOwnedStore = async () => {
  try {
    const response = await api.get("/stores/owner");
    await useGlobalStore.getState().setStore(response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStores = async (params) => {
  try {
    const response = await api.get("/stores", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStore = async (storeId) => {
  try {
    const response = await api.get(`/stores/${storeId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createStore = async (store) => {
  try {
    const response = await api.post("/stores", store);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateStore = async (store) => {
  try {
    const response = await api.put("/stores", store);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteStore = async (storeId) => {
  try {
    const response = await api.delete(`/stores/${storeId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStoreCategories = async () => {
  try {
    const response = await api.get("/stores/categories");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const processStoreCategories = async (categories) => {
  try {
    const response = await api.patch("/stores/categories", { categories });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProductCategories = async (storeId) => {
  try {
    const response = await api.get(`/stores/${storeId}/products/categories`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const processProductCategories = async (categories) => {
  try {
    const response = await api.patch("/stores/products/categories", {
      categories,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProductVariants = async (storeId) => {
  try {
    const response = await api.get(`/stores/${storeId}/products/variants`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const processProductVariants = async (variants) => {
  try {
    const response = await api.patch("/stores/products/variants", { variants });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getSocials = async () => {
  try {
    const response = await api.get("/stores/socials");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStoreFeedback = async () => {
  try {
    const response = await api.get("/stores/feedback");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStoreProductsFeedback = async () => {
  try {
    const response = await api.get("/stores/products/feedback");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const followStore = async (storeId) => {
  try {
    const response = await api.post(`/stores/${storeId}/interest`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addFeedbackToStore = async (storeId, feedback) => {
  try {
    const response = await api.post(`/stores/${storeId}/feedback`, feedback);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
