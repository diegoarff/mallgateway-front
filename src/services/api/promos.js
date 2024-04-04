import api from "./axios";

export const getPromos = async (params) => {
  try {
    const response = await api.get("/promos", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPromosFromFollowed = async (params) => {
  try {
    const response = await api.get("/promos/followed", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
