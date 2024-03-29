import api from "./axios";

export const getStores = async () => {
  try {
    const response = await api.get("/stores");
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
