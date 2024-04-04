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

export const getPromo = async (promoId) => {
  try {
    const response = await api.get(`/promos/${promoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const handlePromoActive = async (promoId) => {
  try {
    const response = await api.post(`/promos/${promoId}/active`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
